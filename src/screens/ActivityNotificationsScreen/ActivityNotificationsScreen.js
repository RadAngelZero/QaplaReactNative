// diego             - 14-08-2019 - us80 - Added load of ActivityNotificationCard
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// diego 			 - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import ActivityNotificationCard from '../../components/ActivityNotificationCard/ActivityNotificationCard';

class ActivityNotificationsScreen extends Component {
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
    return {
        notifications: state.userReducer.user.notification
    }
}

export default connect(mapDispatchToProps)(ActivityNotificationsScreen);
