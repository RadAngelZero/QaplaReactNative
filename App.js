import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Qonversion from 'react-native-qonversion';
import { GiphySDK } from '@giphy/react-native-sdk';


import Router from './src/Router';
import { notifications } from './src/utilities/firebase';
import store from './src/store/store';
import Snackbar from './src/components/Snackbar/Snackbar';
import UpdateApp from './src/components/UpdateApp/UpdateApp';
import { translate } from './src/utilities/i18';

import {
    verLocalVersion,
    verServerVersion,
    verShouldUpdateApp
} from './src/utilities/version';

import {
  dbRemoveAppVersionValueListener,
  dbEnableAppVersionValueListener
} from './src/services/database';

import {
    trackOnSegment
} from './src/services/statistics';

console.disableYellowBox = true;

Qonversion.launchWithKey('lrTSINU4i6um-PUdlac98tRqnJR2wcuk', false);

GiphySDK.configure({ apiKey: '1WgsSOSfrTXTN4IGMMuhajM7WsfxoSdq' });

class App extends React.Component {
    state = {
        openSnackbar: false,
        snackbarMessage: '',
        timerOnSnackBar: false,
        snackbarAction: null,
        snackbarActionMessage: '',
        navigateTo: '',
        closeSnackBar: false,
        updateRequired: false
    };

    componentDidMount() {
        this.enableNotificationListeners();
        this.enableNetworkListener();
        dbEnableAppVersionValueListener(this.checkAppUpdates);
        this.checkAppUpdates();
    }

    componentWillUnmount() {
        /**
         * Usually call a subscriber in this way in the componentWillUnmount event
         * means that we are removing that listener, in this case we are doing that
         */
        this.notificationListener();
        this.notificationOpenedListener();
        this.networkListener();

        dbRemoveAppVersionValueListener();
    }

    /**
     * Enable the listener for network events (internet connection)
     */
    enableNetworkListener() {
        this.networkListener = NetInfo.addEventListener((state) => {
            if (!state.isConnected || ((state.isInternetReachable !== undefined) && (state.isInternetReachable !== null) && !state.isInternetReachable)) {
                const wifiMessage = (state.type === 'wifi') ? translate('App.noInternetConnection.wifiDetails') : '';
                const msg = `${translate('App.noInternetConnection.title')} ${wifiMessage}`;

                this.setState({
                  openSnackbar: true,
                  snackbarMessage: msg,
                  timerOnSnackBar: false
                });
            } else {
                this.setState({ openSnackbar: false });
            }
        });
    }

    /**
     * Enable listeners for Firebase Cloud Messaging notifications
     */
    enableNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        */
        this.notificationListener = notifications.onNotification((notification) => {
            const { title, body, data } = notification;
            const { navigateTo } = data;

            trackOnSegment('Push Notification Foreground', {
                ScreenToNavigate: navigateTo,
                Title: title,
                Body: body
            });

            /**
             * Shows the SnackBar with the title and body of the notification.
             * If the notification have the navigateTo property we set the action
             * with the forceNavigation function
             */
            this.setState({
                snackbarMessage: `${title} ${body}`,
                timerOnSnackBar: true,
                snackbarAction: navigateTo ? () => this.forceNavigation(navigateTo) : null,
                snackbarActionMessage: navigateTo ? translate('App.snackBar.details') : ''
            });
        });


        /*
        * If the app is in background, we listen for when a notification is opened
        */
        this.notificationOpenedListener = notifications.onNotificationOpened((notificationOpen) => {
            const { title, body, _data } = notificationOpen.notification;
            const { navigateTo } = _data;

            trackOnSegment('Push Notification Background', {
                ScreenToNavigate: navigateTo,
                Title: title,
                Body: body
            });

            if (navigateTo) {
                this.forceNavigation(navigateTo);
            }
        });
    }

    /**
     * Indicates to the router that must navigate to the given screen
     * also close the SnackBar and clean their props
     */
    forceNavigation = (navigateTo) => {
        this.setState({
            navigateTo,
            timerOnSnackBar: false,
            closeSnackBar: true
        }, () =>
            this.setState({
                navigateTo: '',
                snackbarActionMessage: '',
                snackbarAction: null,
                closeSnackBar: false,
                snackbarMessage: ''
            })
        );
    }

    /**
     * Check for app updates by consulting the app version from server
     */
    checkAppUpdates = async () => {
        const localVer = verLocalVersion();
        const remoteVer = await verServerVersion();
        const updateRequired = verShouldUpdateApp(localVer, remoteVer);

        if (updateRequired) {
          this.setState({updateRequired}, dbRemoveAppVersionValueListener);
        }
    }

    render() {
        return (
            <>
                {this.state.updateRequired ?
                    <UpdateApp />
                :
                <SafeAreaProvider>
                	<Router forceNavigation={this.state.navigateTo} />
	                <Snackbar
	                    forceClose={this.state.closeSnackBar}
	                    visible={this.state.openSnackbar}
	                    message={this.state.snackbarMessage}
	                    openAndCollapse={this.state.timerOnSnackBar}
	                    action={this.state.snackbarAction}
	                    actionMessage={this.state.snackbarActionMessage} />
                </SafeAreaProvider>
              }
          </>
        )
    }
}

const AppReduxContainer = () => (
  <Provider store={store}>
      <StatusBar backgroundColor='#0e1222' />
      <App />
  </Provider>
);

export default AppReduxContainer;
