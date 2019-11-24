// diego             - 21-11-2019 - us149 - Mark notifications as redaded & replaced ScrollView of notifications by FlatList
// josep.sanahuja    - 18-10-2019 - us140 - Added AnnouncementsScrollView
// diego             - 02-09-2019 - us91 - Add track segment statistic
// diego             - 14-08-2019 - us80 - Added load of ActivityNotificationCard
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// diego 			 - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, InteractionManager } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import ActivityNotificationCard from '../../components/ActivityNotificationCard/ActivityNotificationCard';
import AnnouncementsScrollView from '../../components/AnnouncementsScrollView/AnnouncementsScrollView';
import { recordScreenOnSegment } from '../../services/statistics';
import { markActivityNotificationAsRead } from '../../services/database';

class ActivityNotificationsScreen extends Component {
    constructor(props) {
       super(props);

       // 1: set didFinishInitialAnimation to false
       // This will render only the navigation bar and activity indicator
       this.state = {
         didFinishInitialAnimation: false,
       };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
         // 2: Component is done animating
         // 3: Start fetching the team
         //this.props.dispatchTeamFetchStart();
         // 4: set didFinishInitialAnimation to false
         // This will render the navigation bar and a list of players
         this.setState({
           didFinishInitialAnimation: true
         });

        this.list = [

            /**
             * This event is triggered when the user goes to other screen
             */
            this.props.navigation.addListener(
                'willFocus',
                (payload) => {
                    recordScreenOnSegment('Activity Notifications');
                }
            )
        ]
       });
    }

    componentWillUnmount() {
        //Remove willBlur and willFocus listeners on navigation
        this.list.forEach((item) => item.remove());
    }

    /**
     * Receive an array with the keys from the visible (by the user) notifications
     * and use that array to mark as read the notifications
     * @param {array} viewableItems Array with data from FlatList onViewableItemsChanged event
     * { index: 0,
     * item: 'IdFromTheNotification',
     * key: 'ActivityNotification-IdFromTheNotification',
     * isViewable: true }
     */
    markNotificationsAsRead = ({ viewableItems = [] }) => {
        viewableItems.forEach((viewableItem) => {

            /**
             * If the property notiChecked doesn't exist or exist but is false
             * then we mark the notification as read
             */
            if (!this.props.notifications[viewableItem.item].notiChecked) {
                markActivityNotificationAsRead(this.props.uid, viewableItem.item);
            }
        });
    }

    render() {
        const sortedNotifications = Object.keys(this.props.notifications).sort((a, b) => a < b);

        return (
        	<SafeAreaView style={styles.sfvContainer}>
                <AnnouncementsScrollView />
                {this.state.didFinishInitialAnimation
                    ?
    	            <View style={styles.container}>
                        <FlatList
                            data={sortedNotifications}
                            renderItem={({ item }) => (
                                <ActivityNotificationCard {...this.props.notifications[item]} />
                            )}
                            onViewableItemsChanged={this.markNotificationsAsRead}
                            keyExtractor={(item) => `ActivityNotification-${item}`} />
                    </View>
    	            :
    	            null
    	        }
	        </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    let notifications = {};

    /**
     * Check if the user redux data is filled (if the user is logged)
     * Check if the user have notifications
     */
	if (Object.keys(state.userReducer.user).length > 0 && state.userReducer.user.hasOwnProperty('notification')) {
		notifications = state.userReducer.user.notification;
    }

	return {
        notifications,
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(ActivityNotificationsScreen);
