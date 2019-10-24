import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Router from './src/Router';
import rootReducer from './src/reducers/rootReducer';
import { notifications } from './src/utilities/firebase';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

console.disableYellowBox = true;

class App extends React.Component {
    componentDidMount() {
        this.enableNotificationListeners();
    }

    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }

    async enableNotificationListeners() {
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
            // The user has rehydrated the app, show it something cool
        });
    }

    render() {
        return <Router />
    }
}

const AppReduxContainer = () => (
  <Provider store={store}>
      <App />
  </Provider>
)

export default AppReduxContainer;