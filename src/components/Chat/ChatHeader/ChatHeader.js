import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text } from 'react-native';

import styles from './style';
import Images from '../../../../assets/images';
import QaplaIcon from '../../QaplaIcon/QaplaIcon';

class ChatHeader extends Component {
    render() {
        const eventImage = this.props.navigation.getParam('eventImage');
        const eventName = this.props.navigation.getParam('eventName');

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.topNavBarView}>
                    <View style={styles.headerContainer}>
                        <QaplaIcon onPress={() => this.props.navigation.pop()}>
                            <Images.svg.backIcon />
                        </QaplaIcon>
                        <Image
                            source={eventImage}
                            style={styles.eventImage} />
                        <Text style={styles.eventTitle}>
                            {eventName}
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default ChatHeader;
