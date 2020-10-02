import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Linking, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import styles from './style';
import QaplaText from '../QaplaText/QaplaText';
import { getQaplaStoreProducts } from '../../services/database';
import { getLocaleLanguage } from '../../utilities/i18';
import remoteConfig from '../../services/remoteConfig';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import Hearts from '../UserProfileRewards/Hearts';

const RewardCard = ({ onPress, title, description, price, primaryColor = 'rgb(20, 22, 55)', secondaryColor = 'rgb(20, 22, 55)' }) => (
    <TouchableWithoutFeedback onPress={() => onPress(price)}>
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
            <QaplaText style={styles.prizeTitle} multiline numberOfLines={2}>
                {title}
            </QaplaText>
            <QaplaText
                style={styles.prizeBody}
                numberOfLines={3}>
                {description}
            </QaplaText>
            <View style={styles.lifeContainer}>
                <Hearts
                    displayLimit={5}
                    hearts={price} />
            </View>
        </LinearGradient>
    </TouchableWithoutFeedback>
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

    buyProduct = async (price) => {
        if (this.props.rewards.lifes >= price) {
            Linking.openURL((await remoteConfig.getDataFromKey('Discord')).QAPLA_DISCORD_EXCHANGE_CHANNEL);
        }
    }

    render() {
        const userLanguage = getLocaleLanguage();
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    {Object.keys(this.state.rewards).map((rewardKey, index) => {
                        if (index % 2 === 0) {
                            return <RewardCard
                                onPress={this.buyProduct}
                                primaryColor={this.state.rewards[rewardKey].primaryColor}
                                secondaryColor={this.state.rewards[rewardKey].secondaryColor}
                                title={this.state.rewards[rewardKey].name[userLanguage]}
                                description={this.state.rewards[rewardKey].description[userLanguage]}
                                price={this.state.rewards[rewardKey].price} />;
                        } else {
                            return null;
                        }
                    })}
                </View>
                <View>
                    {Object.keys(this.state.rewards).map((rewardKey, index) => {
                        if (index % 2 !== 0) {
                            return <RewardCard
                                onPress={this.buyProduct}
                                primaryColor={this.state.rewards[rewardKey].primaryColor}
                                secondaryColor={this.state.rewards[rewardKey].secondaryColor}
                                title={this.state.rewards[rewardKey].name[userLanguage]}
                                description={this.state.rewards[rewardKey].description [userLanguage]}
                                price={this.state.rewards[rewardKey].price} />;
                        } else {
                            return null;
                        }
                    })}
                    <View style={{ height: heightPercentageToPx(38) }} />
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    /**
     * Check if user object (in redux) contains data (when a user is not logged
     * or a user make signout their redux object is empty)
     */
    if (Object.keys(state.userReducer.user).length > 0) {
        return {
            rewards: state.userReducer.user.UserRewards
        }
    }

    /**
     * If the user is not logged, then the user will be rejected from this
     * screen, it doesn't matter this return, is just added because
     * the screen is showed (some miliseconds) and we must return an object
     * from this functions (redux requirements)
     */
    return {
        rewards: { lifes: 0 }
    };
}

export default connect(mapStateToProps)(RewardsStore);
