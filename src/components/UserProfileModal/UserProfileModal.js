import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, Image, Text, Switch } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import images from '../../../assets/images';
import { styles } from './style';

class UserProfileModal extends Component {

    state = {
        qoins: 4500,
        totalQoinsSent: 24580,
        userName: 'RadAngelZero',
        userImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/1e6d9d8b-a96f-4f87-8405-558a0c389bd7-profile_image-70x70.png',
        mySupportOpen: false,
        notificateNewStreams: false,
        notificateScheduledStreams: false,
        twitchLinked: false,
    }

    componentDidMount() {

    }

    linkTwitch = () => {
        console.log('link twitch');
    }

    getQoins = () => {
        console.log('get qoins');
    }

    toggleSupportDisplay = () => this.setState({ mySupportOpen: !this.state.mySupportOpen });

    addQreatorCode = () => {
        console.log('creator code screen');
    }

    toggleNewStreamsNotifications = () => {
        this.setState({ notificateNewStreams: !this.state.notificateNewStreams });
    }
    toggleScheduledStreamsNotifications = () => {
        this.setState({ notificateScheduledStreams: !this.state.notificateScheduledStreams });
    }

    openTermsAndConditions = () => {
        console.log('tac screen');
    }

    openPrivacy = () => {
        console.log('priv screen');
    }

    logOut = () => {
        console.log('log out');
    }

    deleteAccount = () => {
        console.log('delete account');
    }

    render() {
        return (
            <Modal
                visible={this.props.open}
                transparent
                animationType='slide'
                onRequestClose={this.props.onClose}
            >
                <View style={styles.mainContainer}>
                    <BlurView
                        style={styles.blur}
                        blurAmount={5}
                        blurType="dark"
                        reducedTransparencyFallbackColor="black" />
                    <TouchableOpacity
                        onPress={this.props.onClose}
                        style={styles.closeIcon}
                    >
                        <images.svg.closeIcon />
                    </TouchableOpacity>
                    <ScrollView style={styles.scrollView}
                        contentContainerStyle={styles.scrollViewContentContainer}>
                        <View style={styles.topContainer}>
                            <View style={styles.userInfoContainer}>
                                <View style={styles.userImageContainer}>
                                    <Image
                                        source={{ uri: this.state.userImage }}
                                        style={styles.userImage}
                                    />
                                </View>
                                <Text style={styles.userUsername}
                                numberOfLines={1}
                                >
                                    {`${this.state.userName}`}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={this.linkTwitch}
                                disabled={this.state.twitchLinked}
                                style={this.state.twitchLinked ? styles.twitchLinkedButton : styles.twitchLinkButton}>
                                <images.svg.twitchIcon style={styles.twitchIcon} />
                                <Text style={styles.twitchLinkedText}>
                                    {this.state.twitchLinked ?
                                        <>
                                            {`Linked`}
                                        </>
                                        :
                                        <>
                                            {`Link Twitch`}
                                        </>
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.qoinsContainer}>
                            <View>
                                <Text style={styles.myQoinsText}>
                                    {`🏦 My Qoins`}
                                </Text>
                                <View style={[styles.qoinsDisplayContainer, styles.marginTop16]}>
                                    <images.svg.qoin style={styles.bigQoin} />
                                    <Text style={styles.qoinsNumber}>
                                        {`${this.state.qoins}`}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={this.getQoins}
                                style={styles.getQoinsButton}>
                                <Text style={styles.getQoinsText}>
                                    {`Get Qoins`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={this.toggleSupportDisplay}
                            style={styles.subCategoryContanier}>
                            <View style={styles.mySupportSubContainer}>
                                <Text style={styles.subCategoryHeaderText}>
                                    {`💜 My support`}
                                </Text>
                                <images.svg.arrowDownWhite style={{
                                    transform: [{ rotate: !this.state.mySupportOpen ? '0deg' : '180deg' }],
                                }} />
                            </View>
                            {this.state.mySupportOpen &&
                                <View style={styles.marginTop16}>
                                    <View style={styles.supportDataContainer}>
                                        <images.svg.qoin style={styles.bigQoin} />
                                        <Text style={styles.qoinsNumber}>
                                            {`${this.state.totalQoinsSent}`}
                                        </Text>
                                    </View>
                                    <Text style={styles.qoinsSubtext}>
                                        {`Total Qoins sent`}
                                    </Text>
                                </View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.addQreatorCode}
                            style={[styles.subCategoryContanier, styles.marginTop24, styles.mySupportSubContainer]}>
                            <Text style={styles.subCategoryHeaderText}>
                                {`🎁 Add a Qreator Code`}
                            </Text>
                            <images.svg.plusIcon />
                        </TouchableOpacity>
                        <View style={[styles.subCategoryContanier, styles.marginTop24]}>
                            <Text style={styles.subCategoryHeaderText}>
                                {`Notifications`}
                            </Text>
                            <View style={[styles.marginTop16, styles.switchGroupContainer]}>
                                <View style={styles.switchTextMaxWidth}>
                                    <Text style={styles.switchHeaderText}>
                                        {`New streams`}
                                    </Text>
                                    <Text style={styles.switchSubText}>
                                        {`Receive notifications when a streamer you follow, posts a new stream `}
                                    </Text>
                                </View>
                                <Switch
                                    onChange={this.toggleNewStreamsNotifications}
                                    value={this.state.notificateNewStreams}
                                />
                            </View>
                            <View style={[styles.marginTop16, styles.switchGroupContainer]}>
                                <View style={styles.switchTextMaxWidth}>
                                    <Text style={styles.switchHeaderText}>
                                        {`Scheduled streams`}
                                    </Text>
                                    <Text style={styles.switchSubText}>
                                        {`Receive notifications about the streams you scheduled in “My streams” `}
                                    </Text>
                                </View>
                                <Switch
                                    onChange={this.toggleScheduledStreamsNotifications}
                                    value={this.state.notificateScheduledStreams}
                                />
                            </View>
                        </View>
                        <View style={[styles.subCategoryContanier, styles.marginTop24]}>
                            <TouchableOpacity
                                onPress={this.openTermsAndConditions}
                                style={styles.switchGroupContainer}>
                                <Text style={[styles.subCategoryHeaderText, styles.fontSize16]}>
                                    {`Terms and Conditions`}
                                </Text>
                                <images.svg.shareArrowTransparent style={styles.externalLinkIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.openPrivacy}
                                style={[styles.marginTop16, styles.switchGroupContainer]}>
                                <Text style={[styles.subCategoryHeaderText, styles.fontSize16]}>
                                    {`Privacy Notice`}
                                </Text>
                                <images.svg.shareArrowTransparent style={styles.externalLinkIcon} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={this.logOut}
                            style={[styles.subCategoryContanier, styles.marginTop24]}>
                            <Text style={styles.finalButtonsText}>
                                {`Log Out`}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.deleteAccount}
                            style={[styles.subCategoryContanier, styles.marginTop24]}>
                            <Text style={[styles.finalButtonsText, styles.deleteTextColor]}>
                                {`Delete Account`}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.bottomSeparation} />
                    </ScrollView>
                </View>
            </Modal >
        );
    }
}

export default UserProfileModal;