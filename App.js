// diego           - 15-11-2019 - us149 - Store moved to an independent file

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

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

console.disableYellowBox = true;

class App extends React.Component {
    state = {
        openSnackbar: false,
        snackbarMessage: '',
        timerOnSnackBar: false,
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
            const { title, body } = notification;
            /**
             * Do something cool with the notification, maybe show a modal or even better,
             * show a snackbar
             * https://material.io/components/snackbars/#usage
             */
            this.setState({
                snackbarMessage: `${title}. ${body}`,
                timerOnSnackBar: true
            });
        });


        /*
        * If the app is in background, we listen for when a notification is opened
        */
        this.notificationOpenedListener = notifications.onNotificationOpened((notificationOpen) => {
            const { title, body, _data } = notificationOpen.notification;
            // The user has rehydrated the app, show him something cool
        });
    }

    /**
     * Check for app updates by consulting the app version from server
     */
    async checkAppUpdates() {
        const localVer = verLocalVersion();
        const remoteVer = await verServerVersion();
        const updateRequired = verShouldUpdateApp(localVer, remoteVer);

        if (updateRequired) {
          this.setState({updateRequired}, () => {
              // Remove listener for app version from server, we already
              // know that we have to update and we have the info,
              // therefore we can ommit the listener.
              dbRemoveAppVersionValueListener();
          });
        }
    }

    render() {
        return (
            <>
                {this.state.updateRequired ?      
                    <UpdateApp />
                :
                <>
                    <Router />
                    <Snackbar
                        visible={this.state.openSnackbar}
                        message={this.state.snackbarMessage}
                        openAndCollapse={this.state.timerOnSnackBar} />
                </>
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
