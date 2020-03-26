import React, { Component } from 'react';
import { View, ActivityIndicator, Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import {
    auth,
    messaging,
    notifications,
    links
} from '../../utilities/firebase';

import { retrieveData } from '../../utilities/persistance';
import styles from './style';
import { getUserNode } from '../../actions/userActions';
import { getUserNameWithUID, getMatchWitMatchId, saveFCMUserToken, getGamerTagWithUID, getUserDiscordTag } from '../../services/database';
import { getListOfGames } from '../../actions/gamesActions';
import { initializeSegment } from '../../services/statistics';
import { getHg1CreateMatch } from '../../actions/highlightsActions';
import { getServerTimeOffset } from '../../actions/serverTimeOffsetActions';
import { loadQaplaLogros } from '../../actions/logrosActions';
import { translate } from '../../utilities/i18';

import {
    trackOnSegment
} from '../../services/statistics';

class AuthLoadingScreen extends Component {
    state = {
        firstLoad: true
    };

    componentDidMount() {
        // Load highlight hg1 Modal
        this.props.loadShowHg1Modal();

        // Initialize the segment SDK to collect user statistics
        initializeSegment();

        auth.onAuthStateChanged(async (user) => {
            this.props.loadListOfGames();

            /**
             * Get the offset between the server timeStamps and the users timeStamp
             */
            await this.props.getServerTimeOffset();

            if (user) {
                this.props.loadUserData(user.uid);
                this.props.loadQaplaLogros(user.uid);

                const userName = await getUserNameWithUID(user.uid).then((userName) => userName);

                if (userName === ''){
                    return this.props.navigation.navigate('ChooseUserName');
                }

                await this.checkNotificationPermission(user.uid);

                /*
                * When the app loads we check if is opened from a notification, also we check if the notificatios
                * has instructions and useful params
                */
                const notificationOpen = await notifications.getInitialNotification();

                if (notificationOpen) {
                    const { notification } = notificationOpen;
                    const { navigateTo, title, body } = notification._data;

                    trackOnSegment('Push Notification Loading App', {
                        screenToNavigate: navigateTo,
                        title: title,
                        body: body,
                        uid: user.uid
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
            if (this.state.firstLoad) {
                const isTutorialDone = await retrieveData('tutorial-done');
                this.setState({ firstLoad: false });
                
                if (isTutorialDone) {
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
     * Check if the user has granted the required permission to receive
     * our push notifications
     * @param {string} uid User identifier on the database
     */
    async checkNotificationPermission(uid) {
        try {
            const notificationPermissionEnabled = await messaging.hasPermission();

            if (notificationPermissionEnabled) {
                this.handleUserToken(uid);
            } else {
                this.requestPermission(uid);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Ask the user for the required permission to receive our push notifications
     * @param {string} uid User identifier on the database
     */
    async requestPermission(uid) {
        try {

            /**
             * If the user don't grant permission we go to the catch block automatically
             */
            await messaging.requestPermission();

            /**
             * If the user grant permission we handle their token
             */
            this.handleUserToken(uid);
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

    /**
     * Get and save the FCM token of the user on the database
     * @param {string} uid User identifier on the database
     */
    async handleUserToken(uid) {
        try {
            const FCMToken = await messaging.getToken();
            await saveFCMUserToken(uid, FCMToken);
        } catch (error) {
            console.error(error);
        }
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
            let screenName = 'LinkBroken';
            const type = this.getParameterFromUrl(url, 'type');
            console.log(`[processLinkUrl] type`, type);
            if (type === 'appDeepLink') {
                const type2 = this.getParameterFromUrl(url, 'type2');
                console.log(`[processLinkUrl] type2`, type2);

                if (type2 === 'matchCard') {
                    this.redirectUserToPublicMatchCard(url);
                }
            }
            
            // TODO: Create screen to notify user that the link is broken,
            // allow him to dismiss the screen and go back to events screen
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
        console.log(`[redirectUserToPublicMatchCard]`);
        this.props.navigation.navigate('MatchDetails', {matchCard: matchObj});
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <ActivityIndicator size='large' color='rgb(61, 249, 223)' />
                    <Text style={styles.textColor}>{translate('loadingScreen.activityIndicatorText')}</Text>
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
