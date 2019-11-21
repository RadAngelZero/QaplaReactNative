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
     * Get the viewable notifications and mark it as readed
     * @param {array} viewableItems Array with data from FlatList onViewableItemsChanged event
     */
    markNotificationsAsRead = ({ viewableItems = [] }) => {
        viewableItems.forEach((viewableItem) => {
            if (!this.props.notifications[viewableItem.item].hasOwnProperty('notiChecked') || !this.props.notifications[viewableItem.item].notiChecked) {
                markActivityNotificationAsRead(this.props.uid, viewableItem.item);
            }
        });
    }

    render() {
        return (
        	<SafeAreaView style={styles.sfvContainer}>
                <AnnouncementsScrollView />
                {this.state.didFinishInitialAnimation
                    ?
    	            <View style={styles.container}>
                        <FlatList
                            data={Object.keys(this.props.notifications).sort((a, b) => a < b)}
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
	if (Object.keys(state.userReducer.user).length > 0 && state.userReducer.user.hasOwnProperty('notification')) {
		notifications = state.userReducer.user.notification;
    }

	return {
        notifications,
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(ActivityNotificationsScreen);
