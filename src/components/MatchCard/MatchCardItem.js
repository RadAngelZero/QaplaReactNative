// josep.sanahuja - 30-12-2019 - us183 - Restructured layout based on supernova
// diego -          12-12-2019 - us169 - Validation on games added
// diego -          12-08-2019 - bug4 - Icons of games and qaploins added to match card
// diego -          06-08-2019 - us75 - Class now extends from PureComponent instead of Component and defaultProps added
// diego -          29-07-2019 - us55 - Remove unnecessary log from on press event

import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { SvgUri } from 'react-native-svg';

import { getProfileImageWithUID } from '../../services/database';

import { styles } from './style';
import Images from '../../../assets/images';

const QaploinIcon = Images.svg.qaploinsIcon;

class MatchCardItem extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            avatarUrl: undefined
        };
    }

    componentDidMount() {
        this.fetchAvatarImageUrlFromUserUid(this.props.adversaryUid);
    }

    /**
     * @description Get adversary profile image and sets it to state
     */
    async fetchAvatarImageUrlFromUserUid(uid) {
        try {
            const avatarUrl = await getProfileImageWithUID(uid);
            this.setState({ avatarUrl });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        const game = this.props.games[this.props.platform][this.props.game];

        /**
         * If the game doesn't exist we return null, otherwise we can get an error on render function
         * also we can not fill the card with the data of a game that we don't have on our local resources
         */
        if (game) {
            /**
             * timeStamps are added on the server, so we need to calculate the timeStamp for the user
             * (this.props.timeStamp - this.props.serverTimeOffset)
             */
            const localUserTime = new Date(this.props.timeStamp - this.props.serverTimeOffset);
            const formatedHour = `${localUserTime.getHours() < 10 ? '0' : ''}${localUserTime.getHours()}`;
            const formatedMinutes = `${localUserTime.getMinutes() < 10 ? '0' : ''}${localUserTime.getMinutes()}`;

            return (
                <TouchableWithoutFeedback onPress={() => navigate('MatchDetails', { matchCard: this.props })}>
                    <View style={styles.matchMainContainer}>
                        <View style={styles.matchContainerRow}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {game.local ?
                                    <game.icon
                                        style={styles.gameLogoImage}
                                        width={37}
                                        height={37} />
                                    :
                                    <SvgUri
                                        style={styles.gameLogoImage}
                                        width={37}
                                        height={37}
                                        uri={game.icon}
                                        fill='#3DF9DF' />
                                }
                                <Text style={styles.gameText}>{game.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.betText}>
                                    {this.props.bet}
                                </Text>
                                <QaploinIcon
                                    width={24}
                                    height={24} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.timeText}>{`${formatedHour}:${formatedMinutes}`}</Text>
                            <View style={styles.matchDetailInfoContainer}>
                                <View style={styles.matchContainerRow}>
                                    {(this.state.avatarUrl !== undefined && this.state.avatarUrl !== '') ?
                                        <Image
                                            style={styles.avatarImage}
                                            source={{ uri: this.state.avatarUrl }} />
                                        :
                                        <View style={styles.avatarImage} />
                                    }
                                    <Text style={styles.usernameText}>{this.props.userName}</Text>
                                </View>
                                <Text style={styles.idRetaText}>ID {this.props.alphaNumericIdMatch}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        } else {
            return null;
        }
    }
}

MatchCardItem.defaultProps = {
    matchesPlay: false
};

function mapStateToProps(state) {
    return {
        games: state.gamesReducer.games
    }
}

export default connect(mapStateToProps)(withNavigation(MatchCardItem));
