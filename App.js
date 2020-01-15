// diego           - 15-11-2019 - us149 - Store moved to an independent file

import React from 'react';
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
        openSnackbar: false
    };

    componentDidMount() {
        this.enableNotificationListeners();
        this.networkListener = NetInfo.addEventListener((state) => {
            if (!state.isConnected || !state.isInternetReachable) {
                this.setState({ openSnackbar: true });
            } else {
                this.setState({ openSnackbar: false });
            }
        });
    }

    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
        this.networkListener();
    }

    /**
     * Enable listeners for Firebase Cloud Messaging notifications
     */
    enableNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        */
        this.notificationListener = notifications.onNotification((notification) => {
            const { title, body, _data } = notification;
            /**
             * Do something cool with the notification, maybe show a modal or even better,
             * show a snackbar
             * https://material.io/components/snackbars/#usage
             */
        });


        /*
        * If the app is in background, we listen for when a notification is opened
        */
        this.notificationOpenedListener = notifications.onNotificationOpened((notificationOpen) => {
            const { title, body, _data } = notificationOpen.notification;
            // The user has rehydrated the app, show him something cool
        });
    }

    render() {
        return (
            <>
                <Snackbar
                    visible={this.state.openSnackbar}
                    message={translate('App.noInternetConnection.title')} />
                <Router />
            </>
        )
    }
}

const AppReduxContainer = () => (
  <Provider store={store}>
      <App />
  </Provider>
)

export default AppReduxContainer;