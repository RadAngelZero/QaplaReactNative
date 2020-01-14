// josep.sanahuja - 30-12-2019 - us183 - Restructured layout based on supernova
// diego -          12-12-2019 - us169 - Validation on games added
// diego -          12-08-2019 - bug4 - Icons of games and qaploins added to match card
// diego -          06-08-2019 - us75 - Class now extends from PureComponent instead of Component and defaultProps added
// diego -          29-07-2019 - us55 - Remove unnecessary log from on press event

import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { styles } from './style';
import Images from '../../../assets/images';

const QaploinIcon = Images.svg.qaploinsIcon;
const ClashIcon = Images.svg.clashIcon;

class MatchCardItem extends PureComponent {
    getCurrentGameResources() {
        /**
         * Check if the game exists on our object of games (from redux)
         */
        if (this.props.games[this.props.platform][this.props.game]) {
            return gamesResources[this.props.games[this.props.platform][this.props.game].replace(/ +/g, "")];
        } else {
            return null;
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        const game = this.getCurrentGameResources();

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
                <TouchableWithoutFeedback onPress={() => navigate('MatchCard', {matchCard: this.props})}>
                    <View style={styles.matchMainContainer}>
                        <View
                            style={styles.matchContainer}>
                            <game.Icon
                                style={styles.gameLogoImage}
                                width={35}
                                height={31} />
                            <Text style={styles.gameText}>{game.name}</Text>
                            <View style={styles.mainBetContainer}>
                                <View style={styles.betContainer}>
                                    <Text style={styles.betText}>{this.props.bet}</Text>
                                    <QaploinIcon
                                        style={styles.qaploinGradientImage}
                                        width={24}
                                        height={24}
                                        />
                                </View>
                                <Text style={styles.timeText}>{`${formatedHour}:${formatedMinutes}`}</Text>
                                <View style={styles.padding}/>
                            </View>
                        </View>
                        <View style={styles.padding}/>
                        <View style={styles.padding}>
                            <View style={styles.matchContainerRow}>
                                {this.props.userProfilePhoto ?
                                    <Image
                                        style={styles.avatarImage}
                                        source={{ uri: this.props.userProfilePhoto }} />
                                    :
                                    <View style={styles.avatarImage} />
                                }
                                <Text style={styles.usernameText}>{this.props.userName}</Text>
                                <View style={styles.padding}/>
                                <Text style={styles.idRetaText}>ID {this.props.alphaNumericIdMatch}</Text>
                            </View>
                            <View style={styles.padding}/>
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

const gamesResources = {
    Fifa17: {
        Icon: Images.svg.fifaIcon,
        name: 'FIFA 19'
    },
    ClashRoyale: {
        Icon: Images.svg.clashIcon,
        name: 'Clash Royale'
    },
    GearsofWar: {
        Icon: Images.svg.gowIcon,
        name: 'Gears of War 4'
    },
    Halo: {
        Icon: Images.svg.haloIcon,
        name: 'Halo 5'
    },
    Hearthstone: {
        Icon: Images.svg.heartstoneIcon,
        name: 'Hearthstone'
    },
    Overwatch: {
        Icon: Images.svg.overwatchIcon,
        name: 'Overwatch'
    },
    LOL: {
        Icon: Images.svg.lolIcon,
        name: 'League of legends'
    },
    Smashbrothers: {
        Icon: Images.svg.smashIcon,
        name: 'Smash Ultimate'
    }
};

function mapStateToProps(state) {
    /**
     * Check if user object (in redux) contains data (when a user is not logged
     * or a user make signout their redux object is empty)
     */
    if (Object.keys(state.userReducer.user).length > 0) {
        return {
            userProfilePhoto: state.userReducer.user.photoUrl,
            games: state.gamesReducer.games
        }
    }

    /**
     * If the user is not logged, then the user will be rejected from this
     * screen, it doesn't matter this return, is just added because
     * the screen is showed (some miliseconds) and we must return an object
     * from this functions (redux requirements)
     */
    return {
        games: state.gamesReducer.games
    }
}

export default connect(mapStateToProps)(withNavigation(MatchCardItem));
