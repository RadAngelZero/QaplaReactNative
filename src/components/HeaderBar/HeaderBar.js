// josep.sanahuja    - 13-11-2019 - us147 - Connect currentScreenId
// josep.sanahuja    - 26-08-2019 - us90 - Added notification highlight
// diego             - 01-08-2019 - us58 - Navigation implemented to notificationRouter
// josep.sanahuja    - 30-07-2019 - us59 - + navigate('Mock2')

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Linking
} from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { styles } from './style';
import { connect } from 'react-redux';
import images from './../../../assets/images';

import HighlightModal from '../HighlightModal/HighlightModal';

import { storeData, retrieveData } from '../../utilities/persistance';
import { HIGHLIGHT_2_NOTIFICATIONS, QAPLA_DISCORD_CHANNEL } from '../../utilities/Constants';

const NotificationIcon = images.svg.notificationIcon;
const DiscordIcon = images.svg.discordIcon;
const SettingsIcon = images.svg.settingsIcon;

class HeaderBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showHg2Modal: false
        };
    }

    componentDidMount() {
        this.checkHighlightsFlags();
    }

    shouldComponentUpdate(nextProp, nextState) {

        // We check flags when there is a change of state in hg1CreateMatch, which
        // indicates that a match was created for the first time by a user.
        if (nextProp.hg1CreateMatch === true && this.props.hg1CreateMatch === false) {
            this.checkHighlightsFlags();
        }

        return true;
    }

    /**
     * @description
     * Perform a serie of function calls after match creation button is pressed.
     */
    onNotiPressBttn = () => {

        // If showHg1Modal is enabled then
        if (this.state.showHg2Modal){

            // Mark the HIGHLIGHT_1_CREATE_MATCH flag, that means, that it has been used
            // and it should not show up again.
            this.markHg2();

            // Hide HIGHLIGHT_1_CREATE_MATCH Modal
            this.toggleHg2Modal();
        }

        this.props.navigation.navigate('Notifications');
    }

    /**
     * @description
     * Checks Highlights flags stored in AsyncStorage, and evaluates which flags
     * to activate in the component state.
     *
     * TODO Josep Maria 25-08-2019:
     * When adding more highlights in the same screen, think a way to synchronize
     * them via logic in the same screen or may be add that logic to the HighlightModal
     * component which does not make sense right now.
     */
    async checkHighlightsFlags() {
        try {
            // Get the value for the highlight flag stored in AsynStorage.
            const value = await retrieveData(HIGHLIGHT_2_NOTIFICATIONS);

            if (value !== null && this.props.hg1CreateMatch === true) {

                // There is data stored for the flag, it can be either 'false' or 'true'.
                this.setState({
                    showHg2Modal: JSON.parse(value)
                });
            }
            else {

                // That means there is no value stored for the flag, therefore
                // result should be 'true', meaning the highlight will activate.
                if (this.props.hg1CreateMatch === true) {

                    this.setState({
                        showHg2Modal: true
                    });
                }

            }
        } catch (error) {
          // Error retrieving flag data
          console.log("[HeaderBar] {checkHighlightsFlags} - error retrieving flag data : " + value);
        }
    }

    /**
     * @description
     * Toggles the flag 'showHg2Modal' in the component state. If value is 'true' then it becomes
     * 'false'. If it is 'false' then it becomes 'true'.
     *
     * TODO: Consider in a future and be aware of toggle instead of a setTrue or setFalse mecanism. 
     */
    toggleHg2Modal = () => {
        this.setState({
            showHg2Modal: !this.state.showHg2Modal
        })
    }

    /**
     * @description
     * Mark the Highlight flag 'HIGHLIGHT_1_CREATE_MATCH' that indicates
     * a highlight for rName of specific user only if that username is not
     * already in use. Flag is stored in AsyncStorage
     */
    markHg2 = () => {
        storeData(HIGHLIGHT_2_NOTIFICATIONS, 'false');
    }

    /**
     * Redirect the user to the discord channel of Qapla
     */
    sendToDiscord = () => {
        Linking.openURL(QAPLA_DISCORD_CHANNEL);
    }

    goToUserProfile = () => {
      this.props.navigation.navigate('AppSettingsMenu');
    }

    userHaveUnreadNotifications = () => {

        if (this.props.notifications && this.checkUnreadNotifications(this.props.notifications)) {
            return true;
        }

        if (this.props.matchNotifications && this.checkUnreadNotifications(this.props.matchNotifications)) {
            return true;
        }

        return false;
    }

    checkUnreadNotifications = (notifications) => {
        return Object.keys(notifications).some((notification) => {
            return !notifications[notification].hasOwnProperty('notiChecked') || !notifications[notification].notiChecked;
        });
    }

    render() {

        return (
            <View style={styles.container} testID='container'>
                <View style={styles.imageContainer}>
                    <HighlightModal
                      visible={this.state.showHg2Modal}
                      onClose={this.toggleHg2Modal}
                      showDelay={1000}
                      cb1={this.markHg2}
                      header='Ve tus Notificaciones'
                      body='Tus retas recibirán notificaciones de desafio, recuerda checar las notificaciones!'>
                          <TouchableWithoutFeedback
                              onPress={this.onNotiPressBttn}
                              testID='NotificationButton'>
                              <View style={styles.imageAndButtonDimensions}>
                                  <NotificationIcon height={24} width={24} />
                                  {this.userHaveUnreadNotifications() &&
                                    <Svg height={12} width={12} style={styles.unreadNotificationsIcon}>
                                        <Circle cx={5} cy={5} r={5} fill='#FF0000' />
                                    </Svg>
                                  }
                              </View>
                          </TouchableWithoutFeedback>
                    </HighlightModal>
                </View>
                <View style={styles.textContainer} testID='textContainer'>
                    <Text style={styles.textStyle} testID='text'>Qapla</Text>
                </View>
                {this.props.currentScreenId !== 'Perfil' &&
                  <View style={styles.discordIcon} testID='discordIcon'>
                      <TouchableWithoutFeedback onPress={this.sendToDiscord}>
                          <View style={styles.imageAndButtonDimensions}>
                              <DiscordIcon
                                  height={32}
                                  width={32}
                                  fill='#FFF' />
                          </View>
                      </TouchableWithoutFeedback>
                  </View>
                }
                {this.props.currentScreenId === 'Perfil' &&
                    <View style={styles.discordIcon}>
                        <TouchableWithoutFeedback onPress={this.goToUserProfile}>
                            <View style={styles.imageAndButtonDimensions}>
                                <SettingsIcon
                                    height={24}
                                    width={24}
                                    fill='#FFF' />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        hg1CreateMatch: state.highlightsReducer.hg1CreateMatch,
        currentScreenId: state.screensReducer.currentScreenId,
        notifications: state.userReducer.user.notification,
        matchNotifications: state.userReducer.user.notificationMatch
    }
}

export default connect(mapStateToProps)(HeaderBar);