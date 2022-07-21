import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Qonversion from 'react-native-qonversion';


import Router from './src/Router';
import { notifications } from './src/utilities/firebase';
import store from './src/store/store';
import Snackbar from './src/components/Snackbar/Snackbar';
import UpdateApp from './src/components/UpdateApp/UpdateApp';
import { translate } from './src/utilities/i18';

import * as RNIap from 'react-native-iap';

import {
    verLocalVersion,
    verServerVersion,
    verShouldUpdateApp
} from './src/utilities/version';

import {
  dbRemoveAppVersionValueListener,
  dbEnableAppVersionValueListener,
  getAndroidProductDetails,
  iOSPurchasesTest
} from './src/services/database';

import {
    trackOnSegment
} from './src/services/statistics';
import { handleInAppPurchases } from './src/services/functions';
import { purchaseErrorListener } from 'react-native-iap';

console.disableYellowBox = true;

Qonversion.launchWithKey('lrTSINU4i6um-PUdlac98tRqnJR2wcuk', false);

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

    purchaseUpdateSubscription = null;
    purchaseErrorSubscription = null;

    componentDidMount() {
        this.inAppPurchasesListeners();
        this.enableNotificationListeners();
        dbEnableAppVersionValueListener(this.checkAppUpdates);
        this.checkAppUpdates();
    }

    componentWillUnmount() {
        /**
         * Usually call a subscriber in this way in the componentWillUnmount event
         * means that we are removing that listener, in this case we are doing that
         */
        this.notificationListener();

        RNIap.endConnection();
        this.notificationOpenedListener();
        if (this.purchaseUpdateSubscription) {
            this.purchaseUpdateSubscription.remove();
            this.purchaseUpdateSubscription = null;
          }
          if (this.purchaseErrorSubscription) {
            this.purchaseErrorSubscription.remove();
            this.purchaseErrorSubscription = null;
          }

        dbRemoveAppVersionValueListener();
    }

    async inAppPurchasesListeners() {
        try {
            await RNIap.initConnection();
            if (Platform.OS === 'android') {
                await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
            }

            this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(async (purchase) => {
                console.log(purchase);
                console.log('Listener called');
                const receipt = Platform.OS === 'android' ? JSON.parse(purchase.transactionReceipt) : { productId: purchase.productId, iOSReceipt: purchase.transactionReceipt };
                if ((Platform.OS === 'android' && receipt && receipt.purchaseState === 0) || Platform.OS === 'ios') {
                    const response = await handleInAppPurchases(receipt, Platform.OS);
                    console.log(response);
                    if (response) {
                        try {
                            this.setState({
                                snackbarMessage: `Se entregaron los Qoins`,
                                timerOnSnackBar: true,
                                snackbarActionMessage: ''
                            });
                            console.log('Transaction finished');
                            await RNIap.finishTransaction(purchase, true);
                        } catch (error) {
                            console.log('Finish transaction Error', error);
                        }
                    }
                }
            });

            this.purchaseErrorSubscription = purchaseErrorListener((error) => {
                iOSPurchasesTest(error);
            });
        } catch (error) {
            await iOSPurchasesTest(error);
        }
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
