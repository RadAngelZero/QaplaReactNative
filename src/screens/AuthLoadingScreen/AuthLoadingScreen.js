import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg from 'react-native-svg';
import { connect } from 'react-redux';

import store from '../..//store/store';
import {
    auth,
    notifications,
    links
} from '../../utilities/firebase';
import { retrieveData, storeData, removeDataItem } from '../../utilities/persistance';
import styles from './style';
import images from '../../../assets/images';
import { getUserNode } from '../../actions/userActions';
import {
    getUserNameWithUID,
    getMatchWitMatchId,
    getGamerTagWithUID,
    getUserDiscordTag,
    updateUserLanguage
} from '../../services/database';
import { getListOfGames } from '../../actions/gamesActions';
import { initializeSegment } from '../../services/statistics';
import { getHg1CreateMatch } from '../../actions/highlightsActions';
import { getServerTimeOffset } from '../../actions/serverTimeOffsetActions';
import { loadQaplaLogros } from '../../actions/logrosActions';
import { translate } from '../../utilities/i18';
import { checkNotificationPermission } from '../../services/messaging';
import remoteConf from '../../services/remoteConfig';
import { trackOnSegment } from '../../services/statistics';
import { connectUserToSendBird } from '../../services/SendBird';
import { getUserProfileImgUrl } from '../../services/storage';

import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';

const QaplaLogo = images.svg.qaplalogoIcon;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

class AuthLoadingScreen extends Component {
    state = {
        firstLoad: true,
        linkOnProgress: false,
        loadingText: translate('loadingScreen.activityIndicatorText'),
    };

    componentDidMount() {
        // Load highlight hg1 Modal
        this.props.loadShowHg1Modal();

        // Initialize the segment SDK to collect user statistics
        initializeSegment();

        try {
            remoteConf.configure();
            remoteConf.fetchAndActivate();
        } catch (error) {
            console.error(`Firebase remote configuration`, error);
        }

        auth.onAuthStateChanged(async (user) => {
            this.props.loadListOfGames();

            /**
             * Get the offset between the server timeStamps and the users timeStamp
             */
            await this.props.getServerTimeOffset();

            if (user) {
                this.props.loadUserData(user.uid);
                this.props.loadQaplaLogros(user.uid);

                // If username does not exist because profile does not exist as well, then
                // user is redirected to ChooUserName where they will create their profile.
                const userName = await getUserNameWithUID(user.uid);

                /**
                 * Get the name of the current screen directly from redux store in order to get
                 * the real last screenId
                 */
                const currentScreen = store.getState().screensReducer.currentScreenId;

                if (!userName && currentScreen !== 'SignIn') {
                    return this.props.navigation.navigate('ChooseUserName');
                } else {
                    const userImg = await getUserProfileImgUrl(user.uid);
                    connectUserToSendBird(user.uid, userName, userImg);

                    /**
                     * Here add functions to write on the user profile, we only can perform
                     * writes on the user profile if it exists, and it only existes
                     * if the user has a valid userName (because we create the profile after
                     * the userName selection)
                     */
                    const cleanUpTopics = await retrieveData('clean-up-topics');

                    /**
                     * Temporary code to update the topics of all the users because of some bugs
                     * finded about this
                     */
                    if (!cleanUpTopics) {
                        updateUserLanguage(user.uid);
                        storeData('clean-up-topics', 'true');
                    }
                }

                await checkNotificationPermission(user.uid);

                /*
                * When the app loads we check if is opened from a notification, also we check if the notificatios
                * has instructions and useful params
                */
                const notificationOpen = await notifications.getInitialNotification();

                if (notificationOpen) {
                    const { notification } = notificationOpen;
                    const { navigateTo, title, body } = notification._data;

                    trackOnSegment('Push Notification Start App', {
                        ScreenToNavigate: navigateTo,
                        Title: title,
                        Body: body
                    });

                    if (navigateTo) {
                        return this.props.navigation.navigate(navigateTo, notification._data);
                    }
                }
            } else {
                this.props.loadQaplaLogros(null);
            }

            /**
             * We only make this process the first time the app loads (when it's opened) because
             * may can cause problems with the signin/login of a user, if the status changes
             * and this process is executed again we are going to be redirected to the 'Achievements'
             * screen, no to the place that we need
             */
            if (!this.state.linkOnProgress && this.state.firstLoad) {
                const isTutorialDone = await retrieveData('tutorial-done');
                if (isTutorialDone) {
                    removeDataItem('tutorial-done');
                }

                this.setState({ firstLoad: false });

                const isNewTutorialDone = await retrieveData('new-tutorial-done');

                if (isNewTutorialDone) {
                    const lastDateUserSawEventRememberScreen = await retrieveData('event-remember-date');
                    const date = new Date();
                    const todayDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

                    if ((!lastDateUserSawEventRememberScreen || lastDateUserSawEventRememberScreen !== todayDate)) {
                        storeData('event-remember-date', todayDate);

                        return this.props.navigation.navigate('TodayEvents');
                    }

                    return this.props.navigation.navigate('Achievements');
                }
                else {
                    return this.props.navigation.navigate('onBoarding');
                }
            }
        });

        this.manageStartDeepLinks();
        this.manageBackgroundDeepLinks();
    }

    /**
     * Enable entry point when the app has been launched from a deeplink
     */
    manageStartDeepLinks = async () => {
        const url = await links.getInitialLink();

        this.processLinkUrl(url);
    }

    manageBackgroundDeepLinks = () => {
        if (!this.unsubscribeBackgroundDpl) {
            this.unsubscribeBackgroundDpl = links.onLink(this.processLinkUrl);
        }
    }

    /**
     * Enable entry point when the app has been launched from a deeplink
     * @param {string | null} url Url of deeplink pressed by the user
     */
    processLinkUrl = (url) => {
        if (url) {
            this.setState({ linkOnProgress: true });

            let screenName = 'LinkBroken';
            const type = this.getParameterFromUrl(url, 'type');

            if (type === 'appDeepLink') {
                const type2 = this.getParameterFromUrl(url, 'type2');

                if (type2 === 'matchCard') {
                    const matchId = this.getParameterFromUrl(url, 'matchId');

                    trackOnSegment('Deep link - matchCard', {
                        MatchId: matchId
                    });

                    return this.redirectUserToPublicMatchCard(url);
                } else if (type2 === 'eventInvitation') {
                    const eventId = this.getParameterFromUrl(url, 'eventId');
                    if (eventId) {
                        return this.props.navigation.navigate('Achievements', { eventToDisplay: eventId });
                    }
                }
            }

            this.props.navigation.navigate(screenName);
        }
    }

    /**
     * Enable entry point when the app has been launched from a deeplink
     * @param {string | null} url Url of deeplink pressed by the user
     */
    getParameterFromUrl(url, parm) {
        var re = new RegExp(".*[?&]" + parm + "=([^&]+)(&|$)");
        var match = url.match(re);
        return (match ? match[1] : "");
    }

    /**
     * Redirect to MatchCard screen with 'matchId'
     * @param {string} url Url of deeplink pressed by the user
     */
    async redirectUserToPublicMatchCard(url) {
        const matchId = this.getParameterFromUrl(url, 'matchId');
        const matchDBObj = await getMatchWitMatchId(matchId);

        let matchObj = {
            deepLink: true,
            expired: true
        };

        if (matchDBObj) {
            //Get the userName from a external function because the match object only have the UID
            const userName = await getUserNameWithUID(matchDBObj.adversary1);
            const gamerTag = await getGamerTagWithUID(matchDBObj.adversary1, matchDBObj.game, matchDBObj.platform);

            matchObj = {
                ...matchObj,
                adversaryUid: matchDBObj.adversary1,
                alphaNumericIdMatch: matchDBObj.alphaNumericIdMatch,
                bet: matchDBObj.bet,
                date: matchDBObj.date,
                game: matchDBObj.game,
                hour: matchDBObj.hour,
                hourResult: matchDBObj.hourResult,
                idMatch: matchId,
                numMatches: matchDBObj.numMatches,
                observations: matchDBObj.observations,
                platform: matchDBObj.platform,
                timeStamp: matchDBObj.timeStamp,
                winBet: matchDBObj.winBet,
                userName: userName,
                gamerTag: gamerTag,
                discordTag: await getUserDiscordTag(matchDBObj.adversary1),
                expired: false
            };
        }

        this.props.navigation.navigate('MatchDetails', { matchCard: matchObj });
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={[styles.container,{transform:[{scale:0.6}]}]}>
                    <QaplaLogo width={300} height={130} />
                    <LoadingAnimation />
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadUserData: (uid) => getUserNode(uid)(dispatch),
        loadListOfGames: () => getListOfGames()(dispatch),
        loadShowHg1Modal: () => getHg1CreateMatch()(dispatch),
        getServerTimeOffset: () => getServerTimeOffset()(dispatch),
        loadQaplaLogros: (uid) => loadQaplaLogros(uid)(dispatch)
    };
}

export default AuthLoadingScreen = connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
