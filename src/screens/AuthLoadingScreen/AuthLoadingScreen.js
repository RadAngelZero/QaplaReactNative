// diego             - 11-12-2019 - us165 - loadQaplaLogros added
// diego             - 14-11-2019 - us146 - Load server time offset
// josep.sanahuja    - 26-08-2019 - us90 - loadShowHg1Modal
// diego             - 02-09-2019 - us91 - Initialize segment
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView

import React, { Component } from 'react';
import { NativeModules, Platform, View, ActivityIndicator, Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import i18n from 'i18n-js';

import { auth, messaging, notifications } from '../../utilities/firebase';
import { retrieveData } from '../../utilities/persistance';
import styles from './style';
import { getUserNode } from '../../actions/userActions';
import { getUserNameWithUID, saveFCMUserToken } from '../../services/database';
import { getListOfGames } from '../../actions/gamesActions';
import { initializeSegment } from '../../services/statistics';
import { getHg1CreateMatch } from '../../actions/highlightsActions';
import { getServerTimeOffset } from '../../actions/serverTimeOffsetActions';
import { loadQaplaLogros } from '../../actions/logrosActions';
import es from './../../../assets/translations/es.json';
import en from './../../../assets/translations/en.json';

i18n.defaultLocale = 'en';

/**
 * According to the operative system, we take the local user language, after that we make a substring with the first two characters
 * so we avoid create a lot of cases because any language have some variations, for example: 'en', 'en_US', 'en_UK', etc. we only take 'en'
 * for the english, however in the future as the app evolve we can evolve the translations files to get cover any variation of the supported languages
 */
i18n.locale =
    Platform.OS === 'ios' ?
        NativeModules.SettingsManager.settings.AppleLocale.substring(0, 2)
    :
        NativeModules.I18nManager.localeIdentifier.substring(0, 2);

/**
 * Flag to support fallbacks, that means, when it's true, if the app can't find a translation for the user language (i18n.locale property)
 * takes the default language (i18n.defaultLocale property)
 * For some reason this flag is false by default. So don't remove this line, at least that we have all the languages covered, in this case
 * we can remove it
 */
i18n.fallbacks = true;
i18n.translations = { es, en };

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

            let navigateToScreen = 'Home';
            let navigationParams = {};
            if (user) {
                this.props.loadUserData(user.uid);
                this.props.loadQaplaLogros(user.uid);

                await this.checkNotificationPermission(user.uid);

                /*
                * When the app loads we check if is opened from a notification, also we check if the notificatios
                * has instructions and useful params
                */
                const notificationOpen = await notifications.getInitialNotification();

                if (notificationOpen) {
                    const { notification } = notificationOpen;
                    const { navigateTo } = notification._data;

                    if (navigateTo) {
                        navigateToScreen = navigateTo;
                        navigationParams = notification._data;
                    }
                }

                const userName = await getUserNameWithUID(user.uid).then((userName) => userName);

                if(userName === ''){
                    return this.props.navigation.navigate('ChooseUserNameScreen');
                }
            } else {
                this.props.loadQaplaLogros(null);
            }

            /**
             * We only make this process the first time the app loads (when it's opened) because
             * may can cause problems with the signin/login of a user, if the status changes
             * and this process is executed again we are goint to be redirected to the 'Publicas'
             * screen, no to the place that we need
             */
            if (this.state.firstLoad) {
                const isTutorialDone = await retrieveData('tutorial-done');
                this.setState({ firstLoad: false });
                if (isTutorialDone) {

                    return this.props.navigation.navigate('Logros');
                }
                else {

                    return this.props.navigation.navigate('Welcome');
                }
            }
        });
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

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                <View style={styles.container}>
                    <ActivityIndicator size='large' color='rgb(61, 249, 223)' />
                    <Text style={styles.textColor}>{i18n.t('loadingScreen.activityIndicatorText')}</Text>
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
