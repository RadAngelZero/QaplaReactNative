// diego          - 05-08-2019 - us58    - Cancel match logic added
// diego          - 29-07-2019 - us55 - Challenge match logic added

import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux';
import styles from './style'

import Images from '../../../assets/images'
import { challengeUser } from '../../services/database';
import { isUserLogged } from '../../services/auth';
import { cancelPublicMatch } from '../../services/functions';

const QaploinsIcon = Images.svg.qaploinsIcon;
const ProfileIcon = Images.svg.profileIcon;

class PublicMatchCardScreen extends Component {
    tryToChallengeUser() {
        //If the user is logged
        if (isUserLogged()) {
            //Get the info of the match
            const matchCard = this.props.navigation.getParam('matchCard');
            //Challenge the user to play the match
            challengeUser(matchCard.adversary1, this.props.uid, matchCard.idMatch);
        } else {
            //If the user is unlogged then redirect the user to Signin Screen
            this.props.navigation.navigate('SignIn');
        }
    }

    tryToCancelMatch() {
        const matchCard = this.props.navigation.getParam('matchCard');
        cancelPublicMatch(matchCard.idMatch);
        this.props.navigation.navigate('Publicas');
    }

    render() {
        const matchCard = this.props.navigation.getParam('matchCard');
        const gameData = getGameData(matchCard.game, this.props.games);
        return (
            <SafeAreaView style={styles.container} testID='publicmatchcardscreen-1'>
                <View style={styles.imageHeader}>
                    <gameData.Icon width={50} height={50} />
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.headerRow1}>
                        <QaploinsIcon style={styles.hr1}/>
                        <Text style={styles.gameName}>{gameData.name}</Text>
                        <QaploinsIcon style={styles.hr3}/>
                    </View>

                    <Text style={styles.gamertag}>{matchCard.userName}</Text>

                    <View style={styles.row}>
                        <View style={styles.infoContainer}>
                            <ProfileIcon style={styles.rowIcon}/>
                            <Text style={[styles.elemR1, styles.activeColor]}>Gamertag</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={[styles.rightTextStyle, styles.activeColor]}>{matchCard.userName}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.infoContainer}>
                            <ProfileIcon style={styles.rowIcon}/>
                            <Text style={styles.elemR1}>No. de Integrantes</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.rightTextStyle}>{matchCard.numMatches == 1 ? '1 vs 1' : '*vs*'}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.infoContainer}>
                            <ProfileIcon style={styles.rowIcon}/>
                            <Text style={styles.elemR1}>Fecha y Hora</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.rightTextStyle}>{matchCard.hour}hrs</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.infoContainer}>
                            <ProfileIcon style={styles.rowIcon}/>
                            <Text style={styles.elemR1}>Qaploins</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.rightTextStyle}>{matchCard.bet}</Text>
                        </View>
                    </View>
                </View>
                {this.props.uid !== matchCard.adversary1 &&
                    <TouchableWithoutFeedback onPress={() => this.tryToChallengeUser()}>
                        <View style={styles.bottomButton}>
                            <Text style={styles.bottomButtonText}>Retar</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                {this.props.uid === matchCard.adversary1 &&
                    <TouchableWithoutFeedback onPress={() => this.tryToCancelMatch()}>
                        <View style={styles.bottomButton}>
                            <Text style={styles.bottomButtonText}>Cancelar</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
            </SafeAreaView>
        );
    }
}

function getGameData(game, listOfAllGames) {
    let gameData;
    Object.keys(listOfAllGames).map((platformKey) => {
        Object.keys(listOfAllGames[platformKey]).map((gameKey) => {
            if (gameKey === game) {
                gameData = gamesResources[listOfAllGames[platformKey][gameKey].replace(/ +/g, "")];
            }
        });
    });
    return gameData;
}

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
        games: state.gamesReducer.games,
        uid: state.userReducer.user.id
    }
}

export default connect(mapStateToProps)(PublicMatchCardScreen);
