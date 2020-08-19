import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import QaplaText from '../QaplaText/QaplaText';
import Images from '../../../assets/images';
import { getQaplaStoreProducts } from '../../services/database';
import { getLocaleLanguage } from '../../utilities/i18';

const RewardCard = ({ title, description, blue = false, primaryColor = 'rgb(20, 22, 55)', secondaryColor = 'rgb(20, 22, 55)' }) => (
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
            {title}
        </QaplaText>
        <QaplaText
            style={styles.prizeBody}
            numberOfLines={3}>
            {description}
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
        rewards: {}
    };

    componentDidMount() {
        this.getProducts();
    }

    /**
     * Load and save all the products on the rewards state variable
     */
    getProducts = async (limit = 10) => {
        this.setState({ rewards: (await getQaplaStoreProducts(limit)).val() });
    }

    render() {
        const userLanguage = getLocaleLanguage();
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    {Object.keys(this.state.rewards).map((rewardKey, index) => {
                        if (index % 2 === 0) {
                            return <RewardCard
                                primaryColor={this.state.rewards[rewardKey].primaryColor}
                                secondaryColor={this.state.rewards[rewardKey].secondaryColor}
                                title={this.state.rewards[rewardKey].name[userLanguage]}
                                description={this.state.rewards[rewardKey].description[userLanguage]} />;
                        } else {
                            return null;
                        }
                    })}
                </View>
                <View>
                    {Object.keys(this.state.rewards).map((rewardKey, index) => {
                        if (index % 2 !== 0) {
                            return <RewardCard
                                primaryColor={this.state.rewards[rewardKey].primaryColor}
                                secondaryColor={this.state.rewards[rewardKey].secondaryColor}
                                title={this.state.rewards[rewardKey].name[userLanguage]}
                                description={this.state.rewards[rewardKey].description [userLanguage]} />;
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
