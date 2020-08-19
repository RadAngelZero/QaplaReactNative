import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import QaplaText from '../QaplaText/QaplaText';
import Images from '../../../assets/images';

const RewardCard = ({ blue = false, primaryColor = 'rgb(20, 22, 55)', secondaryColor = 'rgb(20, 22, 55)' }) => (
    <LinearGradient
        start={{
            x: 0,
            y: 0,
        }}
        end={{
            x: 1.75,
            y: 1,
        }}
        locations={[0, 1]}
        colors={[primaryColor, secondaryColor]}
        style={styles.prizeContainer}>
        <QaplaText style={styles.prizeTitle}>
            {blue ?
            'Twitch Sub'
            :
            '400 CoD Points'
            }
        </QaplaText>
        <QaplaText
            style={styles.prizeBody}
            numberOfLines={3}>
            {blue ?
            '1 month subscription to your streamer of choice.'
            :
            'Get CoD points into your CoD Mobile account'
            }
        </QaplaText>
        <View style={styles.lifeContainer}>
            <Images.svg.lifeIcon style={styles.lifeIcon} />
            <Images.svg.lifeIcon style={styles.lifeIcon} />
            <Images.svg.halfLifeIcon style={styles.lifeIcon} />
        </View>
    </LinearGradient>
);

class RewardsStore extends Component {
    state = {
        rewards: [
            { primaryColor: '#F75F00', secondaryColor: '#FFD632' },
            { primaryColor: '#A716EE', secondaryColor: '#2C07FA' },
            { primaryColor: '#2916EE', secondaryColor: '#FA0707' },
            { primaryColor: '#EE166B', secondaryColor: '#FA9007' }
        ]
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    {this.state.rewards.map((reward, index) => {
                        if (index % 2 === 0) {
                            return (<RewardCard primaryColor={reward.primaryColor} secondaryColor={reward.secondaryColor} />);
                        } else {
                            return null;
                        }
                    })}
                </View>
                <View>
                    {this.state.rewards.map((reward, index) => {
                        if (index % 2 !== 0) {
                            return (<RewardCard blue primaryColor={reward.primaryColor} secondaryColor={reward.secondaryColor} />);
                        } else {
                            return null;
                        }
                    })}
                </View>
            </ScrollView>
        );
    }
}

export default RewardsStore;
