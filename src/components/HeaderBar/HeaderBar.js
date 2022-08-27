import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Linking,
    Image,
    TouchableOpacity
} from 'react-native';
import { styles } from './style';
import { connect } from 'react-redux';

import images from './../../../assets/images';

import { storeData, retrieveData } from '../../utilities/persistance';
import { HIGHLIGHT_2_NOTIFICATIONS } from '../../utilities/Constants';;
import QaplaIcon from '../QaplaIcon/QaplaIcon';
import UserProfileModal from '../UserProfileModal/UserProfileModal';

const DiscordIcon = images.svg.discordIcon;
const SettingsIcon = images.svg.settingsIcon;
const DuotoneDefaultIcon = images.svg.duotoneDefault;
const DuotoneActiveIcon = images.svg.duotoneActive;

class HeaderBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showHg2Modal: false,
            showProfile: false,
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
    onActivityPressBttn = () => {

        // If showHg1Modal is enabled then
        if (this.state.showHg2Modal) {

            // Mark the HIGHLIGHT_1_CREATE_MATCH flag, that means, that it has been used
            // and it should not show up again.
            this.markHg2();

            // Hide HIGHLIGHT_1_CREATE_MATCH Modal
            this.toggleHg2Modal();
        }

        this.props.navigation.navigate('Activity');
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
    sendToDiscord = async () => {
        const link = (await remoteConf.getDataFromKey('Discord')).QAPLA_DISCORD_CHANNEL;
        Linking.openURL(link);
    }

    goToUserProfile = () => {
        this.props.navigation.navigate('SettingsMenu');
    }

    /**
     * Check if the user have unread notifications or match notifications
     */
    userHaveUnreadActivity = () => {
        if (this.props.activity && this.checkUnreadActivity(this.props.activity)) {
            return true;
        }

        return false;
    }

    /**
     * Return true if the given object contains unreaded activity
     * @param {object} activity Set of activity to check
     */
    checkUnreadActivity = (activity) => {
        return Object.keys(activity).some((record) => {
            return !activity[record].hasOwnProperty('read');
        });
    }

    onOpenProfile = () => {
        if (this.props.uid) {
            this.setState({ showProfile: true });
        } else {
            this.props.navigation.navigate('Auth', {
                onSuccessSignIn: () => this.setState({ showProfile: true })
            });
        }
    }

    render() {
        if (this.props.currentScreenId !== 'StreamerProfile') {
            return (
                <SafeAreaView style={styles.sfvContainer} testID='container'>
                    <View style={styles.topNavBarView}>
                        <View>
                            <Image
                                source={images.png.qaplaHeaderIcon.img}
                                style={styles.qaplaImage} />
                        </View>
                        <View style={styles.iconsContainer}>
                            <TouchableOpacity
                                onPress={this.onOpenProfile}
                                style={{
                                    backgroundColor: '#fff',
                                    width: 32,
                                    height: 32,
                                    borderRadius: 16,
                                    overflow: 'hidden',
                                    marginRight: 16,
                                }}>
                                <Image
                                    source={{ uri: this.props.photoUrl }}
                                    style={{
                                        flex: 1,
                                    }}
                                />
                            </TouchableOpacity>
                            <QaplaIcon onPress={this.onActivityPressBttn} touchableStyle={styles.leftIconTouchableStyle}>
                                {this.userHaveUnreadActivity() ?
                                    <DuotoneActiveIcon height={30} width={30} />
                                    :
                                    <DuotoneDefaultIcon height={30} width={30} />
                                }
                            </QaplaIcon>
                            {this.props.currentScreenId !== 'Profile' &&
                                <QaplaIcon onPress={this.sendToDiscord} touchableStyle={styles.rightIconTouchableStyle}>
                                    <DiscordIcon
                                        height={30}
                                        width={30}
                                        fill='#FFF' />
                                </QaplaIcon>
                            }
                            {this.props.currentScreenId === 'Profile' &&
                                <QaplaIcon onPress={this.goToUserProfile} touchableStyle={styles.rightIconTouchableStyle}>
                                    <SettingsIcon
                                        height={30}
                                        width={30}
                                        fill='#FFF' />
                                </QaplaIcon>
                            }
                        </View>
                    </View>
                    <UserProfileModal
                        open={this.state.showProfile}
                        onClose={() => this.setState({ showProfile: false })}
                    />
                </SafeAreaView >
            );
        }
        return null;
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        hg1CreateMatch: state.highlightsReducer.hg1CreateMatch,
        photoUrl: state.userReducer.user.photoUrl,
        currentScreenId: state.screensReducer.currentScreenId,
        activity: state.userReducer.user.activity,
        matchNotifications: state.userReducer.user.notificationMatch,
        userName: state.userReducer.user.userName
    }
}

export default connect(mapStateToProps)(HeaderBar);
