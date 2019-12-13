// diego          - 12-12-2019 - us169 - Add game when challenge behavior added
// diego          - 11-12-2019 - us160 - Updated analitycs
// diego          - 04-12-2019 - us161 - Added BuyQaploinsModal when user have not enough qaploins to challenge a match
// diego          - 14-09-2019 - bug86 - Show correct text when the user has uploaded their results, but the adversary no
// diego          - 05-09-2019 - us104 - Added logic to allow just one result per user on the displayed match
// diego          - 05-09-2019 - us101 - Added timer to show user time before match from matches play expire
//                                       Added timer to show user time for upload result once the adversary was uploaded their result
// diego          - 05-09-2019 - us100 - Added timer to show user time before public match expire
// diego          - 04-09-2019 - us106 - Added accept challenge behavior
// diego          - 03-09-2019 - us96 - Added custom header (TopNavOptions)
// diego          - 02-09-2019 - us91 - Add track segment statistic
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
import { View, Text, SafeAreaView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux';
import styles from './style'

import Images from '../../../assets/images'
import { challengeUser, isMatchAlreadyChallenged, userHasQaploinsToPlayMatch, getGamerTagWithUID, addGameToUser } from '../../services/database';
import { isUserLogged } from '../../services/auth';
import { cancelPublicMatch, acceptChallengeRequest } from '../../services/functions';
import { getGamerTagStringWithGameAndPlatform } from '../../utilities/utils';
import { trackOnSegment } from '../../services/statistics';

// Custom Components
import OneTxtOneBttnModal from '../../components/OneTxtOneBttnModal/OneTxtOneBttnModal'
import AcceptChallengeModal from '../../components/AcceptChallengeModal/AcceptChallengeModal';
import NotEnoughQaploinsModal from '../../components/NotEnoughQaploinsModal/NotEnoughQaploinsModal';
import { ADVERSARY_1_NUMBER, ADVERSARY_2_NUMBER } from '../../utilities/Constants';
import TopNavOptions from '../../components/TopNavOptions/TopNavOptions';
import BuyQaploinsModal from '../../components/BuyQaploinsModal/BuyQaploinsModal';
import { AddGamerTagModal } from '../../components/AddGamerTagModal/AddGamerTagModal';

const QaploinsIcon = Images.svg.qaploinsIcon;
const ProfileIcon = Images.svg.profileIcon;

class PublicMatchCardScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: () => (
            <TopNavOptions
                close
                navigation={navigation}
                onCloseGoTo={navigation.getParam('matchCard').matchesPlay ? 'MisRetas' : 'Publicas'} />)
    });

    constructor(props) {
        super(props);

        this.state = {
            openChalExModal: false,
            openAcceptChallengeModal: false,
            openNoQaploinsModal: false,
            validTimeLeft: 0,
            expired: false,
            openAddGamerTagModal: false,
            openBuyQaploinsModal: false
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({ onCloseGoTo: this.props.navigation.getParam('onCloseGoTo', 'Home') });
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
                        if (hourResult !== '') {
                            leftTime = (this.convertHourToTimeStamp(date, hourResult) + this.convertMinutesToMiliSeconds(15)) - now;
                        } else if (matchesPlay) {
                            leftTime = (timeStamp + this.convertMinutesToMiliSeconds(80)) - now;
                        }
                         else {
                            leftTime = (timeStamp + this.convertMinutesToMiliSeconds(15)) - now;
                        }

                        // Calculate minutes and seconds befor match expire
                        let hours = Math.floor((leftTime % (1000 * 60 * 60 * 60)) / (1000 * 60 * 60));
                        let minutes = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));
                        let seconds = Math.floor((leftTime % (1000 * 60)) / 1000);

                        /**
                         * If there's no more time to interact with the match
                         */
                        if (minutes <= 0 && seconds <= 0) {
                            validTimeLeft = 'Reta expirada';

                            /**
                             * We set the match as expired (this action disable the button)
                             */
                            this.setState({ expired: true });
                            clearInterval(this.timer);
                        } else {
                            /**
                             * If the minute or second value is less than 10 (like 9 or 8)
                             * then we add a 0 before the numeric value (so the value look like: 09 or 08)
                             */
                            minutes = minutes < 10 ? `0${minutes}` : minutes;
                            seconds = seconds < 10 ? `0${seconds}` : seconds;

                            // Legible user string
                            if (hours > 0) {
                                validTimeLeft = `${hours}:${minutes}:${seconds}`;
                            } else {
                                validTimeLeft = `${minutes}:${seconds}`;
                            }
                        }

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
        });
    }

    /**
    * Description:
    * Performs the challenge operation where current logged user challenges adversaryUid for match
    * with matchId. If the user already challenged the adversaryUid then the challenge
    * wont be sent because it already exists in adversaryUid/notificationMatch node
    *
    * @param None
    */
    tryToChallengeUser = async () => {
        trackOnSegment('User Wants To Challenge A Match');

        // If the user is logged
        if (isUserLogged()) {
            // Get the info of the match
            const matchCard = this.props.navigation.getParam('matchCard');

            // Check if the match created by adversaryUid, with matchId was already challenged
            // by the user uid, we want to avoid to challenge a match twice or more.
            const already = await isMatchAlreadyChallenged(matchCard.adversaryUid, this.props.uid, matchCard.idMatch);

            if (!already) {

                if (this.props.userGamesList instanceof Array && this.props.userGamesList.indexOf(matchCard.game) !== -1) {

                    if(this.props.userQaploins >= matchCard.bet) {
                        // Challenge the user to play the match
                        challengeUser(matchCard.adversaryUid, this.props.uid, matchCard.idMatch);

                        this.props.navigation.navigate('Publicas');
                    } else {
                        this.setState({ openBuyQaploinsModal: true });
                    }
                } else {
                    const gamerTag = await getGamerTagWithUID(this.props.uid, matchCard.game, matchCard.platform);
                    if(gamerTag.gamerTag){
                        await addGameToUser(this.props.uid, this.props.userName, matchCard.platform,
                            matchCard.game, gamerTag.gamerTag);
                        this.tryToChallengeUser();
                    } else {
                        this.setState({ openAddGamerTagModal: true });
                    }
                }
            } else {
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
    tryToCancelMatch = () => {
        const matchCard = this.props.navigation.getParam('matchCard');
        cancelPublicMatch(matchCard.idMatch);
        trackOnSegment('User Has Canceled Match');

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
        this.props.navigation.navigate('UploadMatchResult', { matchData: matchCard, currentUserAdversary: matchCard.currentUserAdversary });
    }

    /**
     * @description Check if the user has disabled the modal, if it's not disabled
     * open the modal, if it's disabled just accept the request
     */
    tryToAcceptChallengeRequest = async () => {
        const notification = this.props.navigation.getParam('notification', {});

        // Flag that indicates the modal notifying the user that other notifications
        // will be deleted, will be shown or not.
        const dontShowAcceptChallengeModal = false;// await retrieveData('dont-show-delete-notifications-modal');

        let enoughQaploins = false;

        // Check if the challenger user have enough Qaploins (match bet) in his account so that it can
        // play against the challenged user.
        try {
            enoughQaploins = await userHasQaploinsToPlayMatch(notification.idUserSend, notification.idMatch);
        } catch (error) {
            console.error(error);
        }

        if (enoughQaploins !== null && !enoughQaploins) {
            this.setState({ openNoQaploinsModal: true });
        } else if (dontShowAcceptChallengeModal !== 'true') {
            this.setState({ openAcceptChallengeModal: true });
        } else {
            // bug6: Added user id as 2nd arg.
            acceptChallengeRequest(notification, this.props.uid);
            this.props.navigation.navigate('MisRetas')
        }
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
                                {/**
                                 * bug86: When a user has uploaded a result, text has to show different message
                                 * so the user can know that their result is saved and just can wait for theira adversary result
                                 */}
                                {matchCard.matchesPlay ?
                                    ((matchCard.currentUserAdversary === ADVERSARY_1_NUMBER && matchCard.pickResult1 !== '0')
                                    ||
                                    (matchCard.currentUserAdversary === ADVERSARY_2_NUMBER && matchCard.pickResult2 !== '0')) ?
                                        'Esperando resultado de tu rival:'
                                        :
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

                {/*
                    If the user isn't the creator of the match, and this match is not in matches play and isn't a challenge
                    we show 'Retar' button
                */}
                {(this.props.uid !== matchCard.adversaryUid && !matchCard.matchesPlay && !matchCard.isChallenge) &&
                    <TouchableWithoutFeedback onPress={() => this.tryToChallengeUser()} disabled={this.state.expired}>
                        <View style={styles.bottomButton}>
                            <Text style={styles.bottomButtonText}>Retar</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                {/*
                    If the user is the creator of the match, and this match is not in matches play and isn't a challenge
                    we show 'Cancelar' button
                */}
                {(this.props.uid === matchCard.adversaryUid && !matchCard.matchesPlay && !matchCard.isChallenge) &&
                    <TouchableWithoutFeedback onPress={() => this.tryToCancelMatch()} disabled={this.state.expired}>
                        <View style={styles.bottomButton}>
                            <Text style={styles.bottomButtonText}>Cancelar</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                {/*
                    If the match is on matches play and the user hasn't upload their result yet we show 'Subir Resultado'
                    button, if the match is on matches play and the user has already uploaded their result, then we show
                    just a text
                */}
                {(matchCard.matchesPlay &&
                    ((matchCard.currentUserAdversary === ADVERSARY_1_NUMBER && matchCard.pickResult1 !== '0')
                    ||
                    (matchCard.currentUserAdversary === ADVERSARY_2_NUMBER && matchCard.pickResult2 !== '0'))) ?
                    <Text style={styles.alreadyHaveResult}>Ya has subido un resultado a esta reta</Text>
                    :
                    <>
                    {/*TODO: disabled=this.state.expired} */}
                    {matchCard.matchesPlay &&
                        <TouchableWithoutFeedback onPress={this.sendToUploadMatchResult} disabled={this.state.expired}>
                            <View style={styles.bottomButton}>
                                <Text style={styles.bottomButtonText}>Subir Resultado</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    </>
                }
                {matchCard.isChallenge &&
                    <TouchableWithoutFeedback onPress={this.tryToAcceptChallengeRequest} disabled={this.state.expired}>
                        <View style={styles.bottomButton}>
                            <Text style={styles.bottomButtonText}>Aceptar desafio</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                <OneTxtOneBttnModal
                    visible={ this.state.openChalExModal }
                    onClose={ this.toggleOpenChalExModal }
                    header={ 'Lo sentimos' }
                    body={ 'Ya enviaste un desafio al jugador para esta Partida' }
                    textButton={ 'Entendido' } />
                <AcceptChallengeModal
                    visible={this.state.openAcceptChallengeModal}
                    uid={this.props.uid}
                    notification={this.props.navigation.getParam('notification', {})}
                    onClose={() => this.setState({ openAcceptChallengeModal: false })} />
                <NotEnoughQaploinsModal
                    visible={this.state.openNoQaploinsModal}
                    uid={this.props.uid}
                    notificationKey={this.props.navigation.getParam('notificationKey')}
                    deletedFromMatchDetail={true}
                    onClose={() => this.setState({openNoQaploinsModal: false})} />
                <AddGamerTagModal
                    selectedGame={ { gameKey: matchCard.game, platform: matchCard.platform } }
                    open={this.state.openAddGamerTagModal}
                    uid={this.props.uid}
                    userName={matchCard.userName}
                    onSuccess={this.tryToChallengeUser}
                    onClose={() => this.setState({ openAddGamerTagModal: false }) } />
                <BuyQaploinsModal
                    open={this.state.openBuyQaploinsModal}
                    body='Compra Qaploins para desafiar esta partida'
                    openWhen='User try to challenge a match'
                    onClose={() => this.setState({ openBuyQaploinsModal: false })} />
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
        uid: state.userReducer.user.id,
        userName: state.userReducer.user.userName,
        userGamesList: state.userReducer.user.gameList,
        userQaploins: state.userReducer.user.credits
    }
}

export default connect(mapStateToProps)(PublicMatchCardScreen);
