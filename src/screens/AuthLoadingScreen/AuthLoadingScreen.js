import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import branch from 'react-native-branch';

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
    updateUserLanguage,
    getTwitchUserName,
    getStreamerPublicProfile
} from '../../services/database';
import { getListOfGames } from '../../actions/gamesActions';
import { initializeSegment, setUserIdOnSegment } from '../../services/statistics';
import { getHg1CreateMatch } from '../../actions/highlightsActions';
import { getServerTimeOffset } from '../../actions/serverTimeOffsetActions';
import { loadFeaturedStreams, loadStreamsByListIndex } from '../../actions/streamsActions';
import { translate } from '../../utilities/i18';
import { checkNotificationPermission } from '../../services/messaging';
import remoteConf from '../../services/remoteConfig';
import { trackOnSegment } from '../../services/statistics';
import { connectUserToSendBird } from '../../services/SendBird';
import { getUserProfileImgUrl } from '../../services/storage';

import LoadingAnimation from '../../components/LoadingAnimation/LoadingAnimation';

const QaplaLogo = images.svg.qaplalogoIcon;

class AuthLoadingScreen extends Component {
    state = {
        firstLoad: true,
        linkOnProgress: false,
        loadingText: translate('loadingScreen.activityIndicatorText'),
        isSegmentDataUpdated: false
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
                this.props.loadFeaturedStreams(user.uid);
                for (let i = 0; i < 7; i++) {
                    this.props.loadStreamsByListIndex(user.uid, i);
                }

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

                    const twitchUsername = await getTwitchUserName(user.uid);

                    if (!this.state.isSegmentDataUpdated) {
                        setUserIdOnSegment(user.uid, user.email, userName, twitchUsername);
                        this.setState({ isSegmentDataUpdated: true });
                    }

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
                this.props.loadFeaturedStreams(null);
                for (let i = 0; i < 7; i++) {
                    this.props.loadStreamsByListIndex(null, i);
                }
            }

            /**
             * We only make this process the first time the app loads (when it's opened) because
             * may can cause problems with the signin/login of a user, if the status changes
             * and this process is executed again we are going to be redirected to the 'Explore'
             * screen, no to the place that we need
             */
            if (!this.state.linkOnProgress && this.state.firstLoad) {
                return this.props.navigation.navigate('Explore');
            }
        });

        this.manageStartDeepLinks();
        this.manageBackgroundDeepLinks();
        this.listenBranchLinks();
    }

    listenBranchLinks = async () => {
        branch.subscribe({
            onOpenComplete: ({ error, params }) => {
                if (params) {
                    this.processBranchLinkData(params);
                }
            }
        });
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

    processBranchLinkData = (linkData) => {
        if (linkData.streamerId) {
            this.setState({ linkOnProgress: true });
            return this.redirectUserToStreamerProfile(linkData.streamerId);
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

            switch (type) {
                case 'streamerProfile':
                    const streamerId = this.getParameterFromUrl(url, 'streamerId');
                    if (streamerId) {
                        return this.redirectUserToStreamerProfile(streamerId);
                    }
                    break;
                case 'stream':
                    const streamId = this.getParameterFromUrl(url, 'streamId');
                    if (streamId) {
                        return this.props.navigation.navigate('Timeline', { streamId });
                    }
                    break;
                default:
                    break;
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
     * Redirect to StreamerProfile screen with streamerId
     * @param {string} streamerId StreamerId on the processed deeplink
     */
    async redirectUserToStreamerProfile(streamerId) {
        const profile = await getStreamerPublicProfile(streamerId);
        if (profile.exists()) {
            this.props.navigation.navigate('StreamerProfile', { streamerData: { ...profile.val(), streamerId } });
        } else {
            this.setState({ linkOnProgress: false });
        }
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
        loadFeaturedStreams: (uid) => loadFeaturedStreams(uid)(dispatch),
        loadStreamsByListIndex: (uid, index) => loadStreamsByListIndex(uid, index)(dispatch)
    };
}

export default AuthLoadingScreen = connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
