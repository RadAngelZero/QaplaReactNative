// diego             - 02-09-2019 - us91 - Add track segment statistic
// diego             - 14-08-2019 - us80 - Added load of ActivityNotificationCard
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// diego 			 - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import ActivityNotificationCard from '../../components/ActivityNotificationCard/ActivityNotificationCard';
import { recordScreenOnSegment } from '../../services/statistics';

class ActivityNotificationsScreen extends Component {
	componentDidMount() {
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
    }

    componentWillUnmount() {
        //Remove willBlur and willFocus listeners on navigation
        this.list.forEach((item) => item.remove());
	}
	
    render() {
        return (
        	<SafeAreaView style={styles.sfvContainer}>
	            <View style={styles.container}>
	                <ScrollView>
				{Object.keys(this.props.notifications).reverse().map((notificationKey) => (
				    <ActivityNotificationCard key={`ActivityNotification-${notificationKey}`}
					{...this.props.notifications[notificationKey]} />
				))}
                    	</ScrollView>
	            </View>
	        </SafeAreaView>
        );
    }
}

function mapDispatchToProps(state) {
	let notifications = {};
	if (Object.keys(state.userReducer.user).length > 0 && state.userReducer.user.hasOwnProperty('notification')) {
		notifications = state.userReducer.user.notification;
	}
	
	return { notifications };
}

export default connect(mapDispatchToProps)(ActivityNotificationsScreen);
