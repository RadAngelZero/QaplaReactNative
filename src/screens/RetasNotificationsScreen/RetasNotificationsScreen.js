// josep.sanahuja    - 13-09-2019 - us90 - Add didFinishInitialAnimation
// diego             - 02-09-2019 - us91 - Add track and record screen segment statistic
// diego             - 15-08-2019 - us80 - Order of notifications reversed to show it in the right order
// josep.sanahuja    - 05-08-2019 - us84 - + SafeAreaView
// diego             - 01-08-2019 - us58 - File creation

import React, { Component } from 'react';
import {
    View,
    FlatList,
    SafeAreaView,
    InteractionManager
} from 'react-native';
import styles from './style';
import MatchNotificationCard from '../../components/MatchNotificationCard/MatchNotificationCard';
import { connect } from 'react-redux';
import { recordScreenOnSegment } from '../../services/statistics';
import { markMatchNotificationAsRead } from '../../services/database';

class RetasNotificationsScreen extends Component {
    constructor(props) {
       super(props);

       // 1: set didFinishInitialAnimation to false
       // This will render only the navigation bar and activity indicator
       this.state = {
         didFinishInitialAnimation: false
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

    componentWillMount() {
        this.list = [

            /**
             * This event is triggered when the user goes to other screen
             */
            this.props.navigation.addListener(
                'willFocus',
                (payload) => {
                    recordScreenOnSegment('Match Notifications');
                }
            )
        ]
    }

    componentWillUnmount() {
        //Remove willBlur and willFocus listeners on navigation
        this.list.forEach((item) => item.remove());
    }

    /**
     * Get the viewable notifications and mark it as readed
     * @param {array} viewableItems Array with data from FlatList onViewableItemsChanged event
     */
    markNotificationsAsRead = ({ viewableItems }) => {
        viewableItems.forEach((viewableItem) => {
            if (!this.props.notifications[viewableItem.item].hasOwnProperty('notiChecked') || !this.props.notifications[viewableItem.item].notiChecked) {
                markMatchNotificationAsRead(this.props.uid, viewableItem.item);
            }
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
                {this.state.didFinishInitialAnimation
                ?
                    <View style={styles.container}>
                        <FlatList
                            data={Object.keys(this.props.notifications).reverse()}
                            renderItem={({ item }) => (
                                <MatchNotificationCard
                                    notification={this.props.notifications[item]}
                                    notificationKey={item}
                                    uid={this.props.uid} />
                            )}
                            onViewableItemsChanged={this.markNotificationsAsRead}
                            keyExtractor={(item) => `MatchNotification-${item}`} />
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
