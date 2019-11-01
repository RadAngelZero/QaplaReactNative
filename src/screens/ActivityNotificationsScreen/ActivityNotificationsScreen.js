// josep.sanahuja    - 18-10-2019 - us140 - Added AnnouncementsScrollView
// diego             - 02-09-2019 - us91 - Add track segment statistic
// diego             - 14-08-2019 - us80 - Added load of ActivityNotificationCard
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// diego 			 - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, InteractionManager } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import ActivityNotificationCard from '../../components/ActivityNotificationCard/ActivityNotificationCard';
import AnnouncementsScrollView from '../../components/AnnouncementsScrollView/AnnouncementsScrollView'; 
import { recordScreenOnSegment } from '../../services/statistics';

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

    render() {
        return (
        	<SafeAreaView style={styles.sfvContainer}>
                <AnnouncementsScrollView/>
                {this.state.didFinishInitialAnimation
                    ?
    	            <View style={styles.container}>
                        <ScrollView>
    						{Object.keys(this.props.notifications).sort((a, b) => a < b).map((notificationKey) => (
    							<ActivityNotificationCard key={`ActivityNotification-${notificationKey}`}
    							{...this.props.notifications[notificationKey]} />
    						))}
    					</ScrollView>

                    </View>
    	            :
    	            null
    	        }
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
