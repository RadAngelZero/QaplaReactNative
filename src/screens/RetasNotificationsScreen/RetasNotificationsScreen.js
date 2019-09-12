// josep.sanahuja    - 26-08-2019 - us90 - Add didFinishInitialAnimation
// diego             - 15-08-2019 - us80 - Order of notifications reversed to show it in the right order
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// diego             - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import {
    View,
    ScrollView,
    SafeAreaView,
    InteractionManager
} from 'react-native';
import styles from './style';
import MatchNotificationCard from '../../components/MatchNotificationCard/MatchNotificationCard';
import { connect } from 'react-redux';

class RetasNotificationsScreen extends Component {
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

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                {this.state.didFinishInitialAnimation
                ?
                    <View style={styles.container}>
                        <ScrollView>
                            {Object.keys(this.props.notifications).reverse().map((notificationKey) => (
                                <MatchNotificationCard key={`MatchNotification-${notificationKey}`}
                                    notification={this.props.notifications[notificationKey]}
                                    notificationKey={notificationKey}
                                    uid={this.props.uid} />
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
    let uid = '';
    let notifications = {};

    if (Object.keys(state.userReducer.user).length > 0 && state.userReducer.user.hasOwnProperty('notificationMatch')) {
        uid = state.userReducer.user.id;
        notifications = state.userReducer.user.notificationMatch
    }

    return {
        uid,
        notifications
    }
}

export default connect(mapDispatchToProps)(RetasNotificationsScreen);
