import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Linking, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import styles from './style';
import QaplaText from '../QaplaText/QaplaText';
import { getQaplaStoreProducts } from '../../services/database';
import { getLocaleLanguage } from '../../utilities/i18';
import remoteConfig from '../../services/remoteConfig';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import Hearts from '../UserProfileRewards/Hearts';
import { trackOnSegment } from '../../services/statistics';

const RewardCard = ({ id, onPress, title, description, price, primaryColor = 'rgb(20, 22, 55)', secondaryColor = 'rgb(20, 22, 55)', empty = false }) => {
    if (!empty) {
        return (
            <TouchableWithoutFeedback key={`Store-Product-${id}`} onPress={() => onPress(price, title)}>
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
    }

    return <View key={`Blank-${id}`} style={styles.prizeContainer} />
}

const numberOfColumns = 2;

class RewardsStore extends Component {
    state = {
        rewards: [],
        language: 'en'
    };

    componentDidMount() {
        this.getProducts();
        this.setState({ language: getLocaleLanguage() });
    }

    /**
     * Load and save all the products on the rewards state variable
     */
    getProducts = async () => {
        const rewardsObject = (await getQaplaStoreProducts()).val();
        const rewards = Object.keys(rewardsObject)
            .sort((a, b) => rewardsObject[a].priority - rewardsObject[b].priority)
            .map((key) => {
                rewardsObject[key].id = key;

                return rewardsObject[key];
        });

        const numberOfFullRows = Math.floor(rewards.length / numberOfColumns);

        let numberOfElementsLastRow = rewards.length - (numberOfFullRows * numberOfColumns);

        while(numberOfElementsLastRow !== numberOfColumns && numberOfElementsLastRow > 0) {
            rewards.push({ id: numberOfElementsLastRow, empty: true });
            numberOfElementsLastRow++;
        }

        this.setState({ rewards });
    }

    buyProduct = async (price, title) => {
        if (this.props.rewards.lifes >= price) {
            trackOnSegment('User redeem prize', {
                StoreProductName: title,
                HeartsNumber: price
            });
            Linking.openURL((await remoteConfig.getDataFromKey('Discord')).QAPLA_DISCORD_EXCHANGE_CHANNEL);
        }
    }

    renderRewardCard = ({ item, index }) => (
        <RewardCard
            onPress={this.buyProduct}
            primaryColor={!item.empty ? item.primaryColor : null}
            secondaryColor={!item.empty ? item.secondaryColor : null}
            title={!item.empty ? item.name[this.state.language] : null}
            description={!item.empty ? item.description[this.state.language] : null}
            price={!item.empty ? item.price : null}
            empty={item.empty ? item.empty : false} />
    );

    render() {
        return (
            <FlatList
                scrollEnabled={this.props.enableScroll}
                contentContainerStyle={styles.container}
                nestedScrollEnabled
                data={this.state.rewards}
                renderItem={this.renderRewardCard}
                numColumns={numberOfColumns}
                keyExtractor={(item, index) => `Store-Product-${index}`}
                ListFooterComponent={() => <View style={{ height: heightPercentageToPx(4) }}/>} />
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
            rewards: state.userReducer.user.UserRewards,
            enableScroll: state.profileLeaderBoardReducer.enableScroll
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
