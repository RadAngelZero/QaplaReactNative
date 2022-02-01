import React, { Component } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import images from '../../../assets/images';
import QaplaText from '../../components/QaplaText/QaplaText';
import ProgressBar from '../../components/UserProfileRewards/Bar';
import Hearts from '../../components/UserProfileRewards/Hearts';
import { translate } from '../../utilities/i18';

import styles from './style';

class CheersSentScreen extends Component {
    state = {
        points: 0
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({ points: 6 });
        }, 250);
    }

    finish = () => {
        this.props.navigation.popToTop();
    }

    render() {
        let streamerName = this.props.navigation.getParam('streamerName', '');

        return (
            <SafeAreaView style={styles.container}>
                <Image source={images.png.heartHands.img} style={styles.heartHandsImage} />
                <LinearGradient useAngle={true}
                    angle={136.25}
                    colors={['#A716EE', '#2C07FA']}
                    style={styles.card}>
                    <Text style={styles.thankTitle}>
                        {translate('cheersSentScreen.thankYouTitle')}
                    </Text>
                    <Text style={styles.cheersSentMessage}>
                        {translate('cheersSentScreen.sentCheersTo')}
                        <Text style={styles.streamerName}>
                            {streamerName}
                        </Text>
                    </Text>
                    <View style={styles.cheersBar}>
                        <images.svg.lifeIcon style={{ alignSelf: 'flex-end', marginBottom: 12 }} height={24} width={24} color='rgba(255, 255, 255, .25)' />
                        <ProgressBar
                            unfilledColor='rgba(255, 255, 255, .25)'
                            progress={this.state.points / 10}
                            color='#00FFDD'
                            borderWidth={0} />
                        <View style={styles.rewardsHeaderContainer}>
                            <View style={styles.lifesContainer}>
                                <Hearts
                                    displayLimit={3}
                                    hearts={2.5} />
                            </View>
                            <QaplaText style={styles.currentPoints}>
                                {this.state.points}/10
                            </QaplaText>
                        </View>
                    </View>
                    <Text style={styles.barUpdated}>
                        {translate('cheersSentScreen.cheersBarUpdated')}
                    </Text>
                    <TouchableOpacity style={styles.backButton} onPress={this.finish}>
                        <Text style={styles.finish}>
                            {translate('cheersSentScreen.backToProfile', { streamerName })}
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}

export default CheersSentScreen;