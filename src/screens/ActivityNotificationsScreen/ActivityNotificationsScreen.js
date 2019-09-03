// diego             - 14-08-2019 - us80 - Added load of ActivityNotificationCard
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// diego 			 - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, InteractionManager } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import ActivityNotificationCard from '../../components/ActivityNotificationCard/ActivityNotificationCard';

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
       });
    }

    // componentWillMount(){
    // 	setTimeout(() => {
    //         this.setState({didFinishInitialAnimation: true});
    //     }, 10000);
    // }

    render() {
        return (
        	<SafeAreaView style={styles.sfvContainer}>
        	{this.state.didFinishInitialAnimation
                ?
	            <View style={styles.container}>
	                <ScrollView>
				{Object.keys(this.props.notifications).reverse().map((notificationKey) => (
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
