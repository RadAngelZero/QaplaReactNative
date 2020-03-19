// diego           - 15-11-2019 - us149 - Store moved to an independent file

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import Router from './src/Router';
import { notifications } from './src/utilities/firebase';
import store from './src/store/store';
import Snackbar from './src/components/Snackbar/Snackbar';
import { translate } from './src/utilities/i18';

console.disableYellowBox = true;

class App extends React.Component {
    state = {
        openSnackbar: false,
        snackbarMessage: '',
        timerOnSnackBar: false,
        snackbarAction: null,
        snackbarActionMessage: '',
        navigateTo: '',
        closeSnackBar: false
    };

    componentDidMount() {
        this.enableNotificationListeners();
        this.enableNetworkListener();
    }

    componentWillUnmount() {
        /**
         * Usually call a subscriber in this way in the componentWillUnmount event
         * means that we are removing that listener, in this case we are doing that
         */
        this.notificationListener();
        this.notificationOpenedListener();
        this.networkListener();
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

            /**
             * Shows the SnackBar with the title and body of the notification
             * If the notification have the navigateTo property we set the action
             * with the forceNavigation function
             */
            this.setState({
                snackbarMessage: `${title}. ${body}`,
                timerOnSnackBar: true,
                snackbarAction: () => this.forceNavigation(navigateTo),
                snackbarActionMessage: navigateTo ? translate('App.snackBar.details') : ''
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

    render() {
        return (
            <>
                <Router forceNavigation={this.state.navigateTo} />
                <Snackbar
                    forceClose={this.state.closeSnackBar}
                    visible={this.state.openSnackbar}
                    message={this.state.snackbarMessage}
                    openAndCollapse={this.state.timerOnSnackBar}
                    action={this.state.snackbarAction}
                    actionMessage={this.state.snackbarActionMessage} />
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
