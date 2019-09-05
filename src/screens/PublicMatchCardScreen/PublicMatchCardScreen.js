// diego          - 05-09-2019 - us101 - Added timer to show user time before match from matches play expire
//                                       Added timer to show user time for upload result once the adversary was uploaded their result
// diego          - 05-09-2019 - us100 - Added timer to show user time before public match expire
// diego          - 19-08-2019 - us89 - Updated references to received params from navigation
// diego          - 14-08-2019 - us77 - Added navigation to upload results on 'Subir Resultado' button
// josep.sanahuja - 13-08-2019 - us86 - + match challenge already exist logic
// diego          - 12-08-2019 - bug4 - Update name of adversary1 prop to adversaryUid because the adversary can be also the adversary2
// josep.sanahuja - 12-08-2019 - us85 - 'Subir Resultado' button navigates to UploadMatchResult
// diego          - 06-08-2019 - us76 - Show gamerTag key and value of the match and adversary2
// diego          - 06-08-2019 - us75 - 'Subir Resultado' button added
// josep.sanahuja - 05-08-2019 - us84 - Changed SafeAreaView style
// diego          - 05-08-2019 - us58 - Cancel match logic added
// diego          - 29-07-2019 - us55 - Challenge match logic added

import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, InteractionManager } from 'react-native'
import { connect } from 'react-redux';
import styles from './style'

import Images from '../../../assets/images'
import { challengeUser, isMatchAlreadyChallenged } from '../../services/database';
import { isUserLogged } from '../../services/auth';
import { cancelPublicMatch } from '../../services/functions';
import { getGamerTagStringWithGameAndPlatform } from '../../utilities/utils';

// Custom Components
import OneTxtOneBttnModal from '../../components/OneTxtOneBttnModal/OneTxtOneBttnModal'

const QaploinsIcon = Images.svg.qaploinsIcon;
const ProfileIcon = Images.svg.profileIcon;

class PublicMatchCardScreen extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            openChalExModal: false,
            validTimeLeft: 0
        };
    }

    componentDidMount() {
        this.list = [

            /**
             * This event is triggered when the user goes to other screen
             */
            this.props.navigation.addListener(
                'willBlur',
                (payload) => {
                    clearInterval(this.timer);
                }
            ),

            /**
             * This event is triggered when the user enter to the screen
             */
            this.props.navigation.addListener(
                'willFocus',
                (payload) => {
                    const { date, hourResult, timeStamp, matchesPlay } = this.props.navigation.getParam('matchCard');
                    this.timer = setInterval(() => {
                        let now = new Date().getTime();
                        let leftTime = 0;
                        let validTimeLeft = 0;

                        // If some result was uploaded
                        if (hourResult) {
                            leftTime = (this.convertHourToTimeStamp(date, hourResult) + this.convertMinutesToMiliSeconds(15)) - now;
                        } else if (matchesPlay) {
                            leftTime = (timeStamp + this.convertMinutesToMiliSeconds(60)) - now;
                        }
                         else {
                            leftTime = (timeStamp + this.convertMinutesToMiliSeconds(15)) - now;
                        }

                        // Calculate minutes and seconds befor match expire
                        let minutes = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));
                        let seconds = Math.floor((leftTime % (1000 * 60)) / 1000);

                        /**
                         * If the minute or second value is less than 10 (like 9 or 8)
                         * then we add a 0 before the numeric value (so the value look like: 09 or 08)
                         */ 
                        minutes = minutes < 10 ? `0${minutes}` : minutes;
                        seconds = seconds < 10 ? `0${seconds}` : seconds;

                        // Legible user string
                        validTimeLeft = `${minutes}:${seconds}`;

                        this.setState({ validTimeLeft });
                    }, 1000);
                }
            )
        ];
    }

    /**
     * Convert the quantity of minutes to miliseconds (util for timestamp operations)
     * @param {number} minutes The number of minutes to convert
     */
    convertMinutesToMiliSeconds(minutes) {
        return minutes * 60000;
    }

    /**
    * Convert a given date and hour in a UTC date and return their timestamp
    * @param {string} date Day and month in format DD/MM
    * @param {string} hour hour and minute in format HH/mm
    */
    convertHourToTimeStamp(date, hour) {
        const [day, month] = date.split('/').map(p => parseInt(p, 10));
        const [h, min] = hour.split(':').map(p => parseInt(p, 10));
        return new Date(Date.UTC((new Date).getUTCFullYear(), month - 1, day, h, min, 0, 0)).getTime();
    }

    /**
    * Description:
    * Closes Modal that reminds that a challenge was already sent for a match
    *
    * @param None
    */
    toggleOpenChalExModal = async () => {
        this.setState({
          openChalExModal: !this.state.openChalExModal
        })
    } 

    /**
    * Description:
    * Performs the challenge operation where current logged user challenges adversaryUid for match
    * with matchId. If the user already challenged the adversaryUid then the challenge
    * wont be sent because it already exists in adversaryUid/notificationMatch node
    *
    * @param None
    */
    async tryToChallengeUser() {
        // If the user is logged
        if (isUserLogged()) {
            // Get the info of the match
            const matchCard = this.props.navigation.getParam('matchCard');
            
            // Check if the match created by adversaryUid, with matchId was already challenged 
            // by the user uid, we want to avoid to challenge a match twice or more.
            const already = await isMatchAlreadyChallenged(matchCard.adversaryUid, this.props.uid, matchCard.idMatch);
 
            if (!already)
            {
                // Challenge the user to play the match
                challengeUser(matchCard.adversaryUid, this.props.uid, matchCard.idMatch);
            }
            else {
                // Show Modal
                this.toggleOpenChalExModal();
            }

        } else {
            // If the user is unlogged then redirect the user to Signin Screen
            this.props.navigation.navigate('SignIn');
        }
    }

    /**
     * Cancel a public match
     */
    tryToCancelMatch() {
        const matchCard = this.props.navigation.getParam('matchCard');
        cancelPublicMatch(matchCard.idMatch);

        this.props.navigation.navigate('Publicas');
    }

    /**
     * Send the user with the necesary parameters to the UploadMatchResultScreen
     */
    sendToUploadMatchResult = () => {
        const matchCard = this.props.navigation.getParam('matchCard');
        
        /**
         * currentUserAdversary is a number value that means what adversary is the current user on the match
         * if the user is the author (creator) of the match, is the adversary1, if not, is the adversary2, and
         * that information is important when their result is uploaded
         */
        this.props.navigation.navigate('UploadMatchResult', { idMatch: matchCard.idMatch, currentUserAdversary: matchCard.currentUserAdversary });
    }

    render() {
        const matchCard = this.props.navigation.getParam('matchCard');
        const gameData = getGameData(matchCard.game, this.props.games);
        return (
            <SafeAreaView style={styles.sfvContainer} testID='publicmatchcardscreen-1'>
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
                            <Text style={[styles.elemR1, styles.activeColor]}>{getGamerTagStringWithGameAndPlatform(matchCard.platform, matchCard.game)}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={[styles.rightTextStyle, styles.activeColor]}>{matchCard.gamerTag.gamerTag}</Text>
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
                            <Text style={styles.elemR1}>
                                {matchCard.matchesPlay ?
                                    'Sube tu resultado en:'
                                    :
                                    'Expira en:'
                                }
                            </Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.rightTextStyle}>{this.state.validTimeLeft}</Text>
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
                {(this.props.uid !== matchCard.adversaryUid && !matchCard.matchesPlay) &&
                    <TouchableWithoutFeedback onPress={() => this.tryToChallengeUser()}>
                        <View style={styles.bottomButton}>
                            <Text style={styles.bottomButtonText}>Retar</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                {(this.props.uid === matchCard.adversaryUid && !matchCard.matchesPlay) &&
                    <TouchableWithoutFeedback onPress={() => this.tryToCancelMatch()}>
                        <View style={styles.bottomButton}>
                            <Text style={styles.bottomButtonText}>Cancelar</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                {matchCard.matchesPlay &&
                    <TouchableWithoutFeedback onPress={this.sendToUploadMatchResult}>
                        <View style={styles.bottomButton}>
                            <Text style={styles.bottomButtonText}>Subir Resultado</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                <OneTxtOneBttnModal
                    visible={ this.state.openChalExModal }
                    onClose={ this.toggleOpenChalExModal }
                    header={ 'Lo sentimos' }
                    body={ 'Ya enviaste un desafio al jugador para esta Partida' }
                    textButton={ 'Ok' } />
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
