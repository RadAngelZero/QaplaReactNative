// diego -        12-08-2019 - bug4 - Icons of games and qaploins added to match card
// diego -        06-08-2019 - us75 - Class now extends from PureComponent instead of Component and defaultProps added
// diego -        29-07-2019 - us55 - Remove unnecessary log from on press event

import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { styles } from './style';
import Images from '../../../assets/images';

const QaploinIcon = Images.svg.qaploinsIcon;

class MatchCardItem extends PureComponent {
    getCurrentGameResources() {
        return gamesResources[this.props.games[this.props.platform][this.props.game].replace(/ +/g, "")];
    }

    render() {
        const {navigate} = this.props.navigation;
        const game = this.getCurrentGameResources();

        /**
         * timeStamp's are added on the server, so we need to calculate the timeStamp for the user
         * (this.props.timeStamp - this.props.serverTimeOffset)
         */
        const localUserTime = new Date(this.props.timeStamp - this.props.serverTimeOffset);
        const formatedHour = `${localUserTime.getHours() < 10 ? '0' : ''}${localUserTime.getHours()}`;
        const formatedMinutes = `${localUserTime.getMinutes() < 10 ? '0' : ''}${localUserTime.getMinutes()}`;

        return (
            <TouchableWithoutFeedback onPress={() => navigate('MatchCard', {matchCard: this.props})}>
                <View style={styles.container}>
                        <View style={styles.rowGame}>
                            <View style={styles.gameContainer}>
                                <game.Icon width={28} height={28} />
                                <Text style={styles.leftTextStyle}>{game.name}</Text>
                            </View>
                            <View style={styles.matchDetailInfoContainer}>
                                <View style={styles.betContainer}>
                                    <QaploinIcon style={styles.qaploinIcon} />
                                    <Text style={styles.rightTextStyle}>{this.props.bet}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.rowUserName, styles.marginBottom10]}>
                            <View style={styles.hourContainer}>
                                <Text style={styles.rightTextStyle}>{`${formatedHour}:${formatedMinutes}`}</Text>
                            </View>
                        </View>
                    <View style={[styles.row, styles.marginBottom10]}>
                        <View style={styles.adversaryDataContainer}>
                            <View style={styles.avatarImage}></View>
                            <Text style={styles.leftFooterTextStyle}>{this.props.userName}</Text>
                        </View>
                        <View style={styles.idMatchContainer}>
                            <Text style={styles.rightFooterTextStyle}>ID {this.props.alphaNumericIdMatch}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
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
    return {
        games: state.gamesReducer.games
    }
}

export default connect(mapStateToProps)(withNavigation(MatchCardItem));
