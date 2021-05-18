import { database, TimeStamp } from '../utilities/firebase';
import { randomString, getGamerTagKeyWithGameAndPlatform } from '../utilities/utils';
import { DB_NEW_LINE_SEPARATOR, EVENTS_TOPIC } from '../utilities/Constants';
import store from '../store/store';
import { getLocaleLanguage } from '../utilities/i18';
import { unsubscribeUserFromTopic, subscribeUserToTopic } from './messaging';
import { checkNotificationPermission } from '../services/messaging';

export const matchesRef = database.ref('/Matches');
export const matchesPlayRef = database.ref('/MatchesPlay');
export const usersRef = database.ref('/Users');
const gamesRef = database.ref('/GamesResources');
export const commissionRef = database.ref('/Commission');
export const gamersRef = database.ref('/Gamers');
export const logrosRef = database.ref('/logros');
export const logrosActRef = database.ref('/logrosActivos');
export const cuentasVerificadasRef = database.ref('/CuentasVerificadas');
export const verificationOnProccessRef = database.ref('/VerificacionEnProceso');
export const veriLogroSocialRef = database.ref('/verificarLogroSocial');
export const feedbackUsersRef = database.ref('/FeedbackUsers');
export const tournamentsRef = database.ref('/torneos');
export const activeTournamentsRef = tournamentsRef.child('torneosActivos');
export const pointsTournamentsRef = database.ref('/puntosTorneos');
export const eventsRef = database.ref('/eventosEspeciales');
export const activeEventsRef = eventsRef.child('eventsData');
const eventsRequestsRef = eventsRef.child('JoinRequests');
export const eventParticipantsRef = database.ref('/EventParticipants');
export const announcementsActRef = database.ref('/Announcements/Active');
export const privacyRef = database.ref('/Privacy');
export const usersBalance = database.ref('usersQaplaBalance');
export const userTopicSubscriptions = database.ref('userTopicSubscriptions');
const qoinsDonationFormUrlRef = database.ref('QoinsDonationFormUrl');
const qaplaStoreRef = database.ref('QaplaStore');
const usersRewardsProgressRef = database.ref('/UsersRewardsProgress');
const DonationsCostsRef = database.ref('/DonationsCosts');
const DonationsLeaderBoardRef = database.ref('/DonationsLeaderBoard');
const LeaderBoardPrizesRef = database.ref('/LeaderBoardPrizes');
const leaderboardWinnersRef = database.ref('/LeaderboardWinners');
const userStreamsRewardsRef = database.ref('/UserStreamsRewards');
const versionAppRef = database.ref('VersionApp/QaplaVersion');

/**
 * Returns the userName of the specified user
 * @param {string} Uid User id from firebase
 */
export async function getUserNameWithUID(Uid) {
    try {
        const userNameSnap = await usersRef.child(Uid).child('userName').once('value');
        return userNameSnap.val();
    } catch (error) {
        console.error(error);
    }
}

/**
 * Description: Returns the gamerTag of the specified user and the game and
 * platform of the current match. There are some platforms that share the same gamerTag,
 * therefore, in this code in the function this fact is checked (ps4white, xbox_white).
 *
 * @param {string} Uid User id from firebase
 * @param {string} game Name of the game of the current match
 * @param {string} platform Name of the platform of the current match
 *
 * TODO (12-09-2019): Move the logic that checks if all games from a platform share
 * the same gamertag into a cloud function that basically returns the gamertag.
 */
export async function getGamerTagWithUID(Uid, game, platform) {
    return await usersRef.child(Uid).child('gamerTags').once('value').then((data) =>
    {
        if (data.exists()) {
            switch (platform) {
                case 'pc_white':
                    if (game === 'aClash') {
                        return {
                            gamerTag: data.val().clashTag != null ? data.val().clashTag : null
                        }
                    } else if (game === 'pcLol'){
                        return {
                            gamerTag: data.val().lolTag != null ? data.val().lolTag : null
                        }
                    } else if (game === 'pHearth' || game === 'pOver'){
                        return {
                            gamerTag: data.val().battlenet != null ? data.val().battlenet : null
                        }
                    } else {
                        return {
                            gamerTag: data.val()[game] != null ? data.val()[game] : null
                        }
                    }
                case 'ps4_white':
                    return {
                        gamerTag: data.val().psn != null ? data.val().psn : null
                    }
                case 'xbox_white':
                    return {
                        gamerTag: data.val().xboxLive != null ? data.val().xboxLive : null
                    }
                case 'switch_white':
                    return {
                        gamerTag: data.val().NintendoID != null ? data.val().NintendoID : null
                    }
                default:
                    return { gamerTag: null };
            }
        } else {
            return { gamerTag: null };
        }
    });
}

/**
 * Return the discord tag of a user
 *
 * @param {string} uid User identifier on database
 * @returns {string} userDiscordTag
 */
export async function getUserDiscordTag(uid) {
    return (await usersRef.child(uid).child('discordTag').once('value')).val();
}

/**
 * Create the profile of a user
 *
 * @param {string} Uid          User identifier on database
 * @param {string} email        Email from the user
 * @param {string} userName     Username selected before profile creation
 */
export async function createUserProfile(Uid, email, userName ) {
    // We use city to save the userName in uppercase, so we can check if the
    // username is available, the username must be unique doesn't matter CAPS and lowers.
    let city = userName.toUpperCase();

    const profileObj = {
        bio: '',
        captain: 'false',
        city,
        country: 'Mexico',
        credits: 0,
        discordTag: '',
        email,
        experience: 0,
        id: Uid,
        level: 0,
        losses: 0,
        penalty: '',
        phoneNumber: '',
        photoUrl: '',
        searching: '',
        status: false,
        token: '',
        userName,
        isUserLoggedOut: false,
        wins: 0,
        language: getLocaleLanguage()
    };

    await usersRef.child(Uid).update(profileObj);

    /**
     * We call this function because we need to save the user token, before do this
     * we need the users permission (espcially on iOS) this function perform the
     * permission requirement and if the user allow us to send push notifications
     * it saves the token
     */
    checkNotificationPermission(Uid);
}

/**
 * Returns the string value of the Twitch userName of the given user
 * @param {string} uid User identifier
 */
export async function getTwitchUserName(uid) {
    return (await usersRef.child(uid).child('twitchUsername').once('value')).val();
}

/**
 * Check if the user has their twitchId on their profile (if we have their twitch account linked)
 * @param {string} uid User identifier
 */
 export async function userHaveTwitchId(uid) {
    return (await usersRef.child(uid).child('twitchId').once('value')).exists();
}

/**
 * Check if the given twitchId is already used by any user
 * @param {string} twitchId Twitch identifier
 */
 export async function isNewTwitchId(twitchId) {
    return !(await usersRef.orderByChild('twitchId').equalTo(twitchId).once('value')).exists();
}

/**
 * Save the twitch acces token on the user profile
 * @param {string} uid User identifier
 * @param {string} accesToken Twitch access token
 */
export async function saveTwitchData(uid, twitchData) {
    await usersRef.child(uid).update(twitchData);
}

/**
 * Update the userName of specific user only if that username is not already in use
 * @param {string} uid User identifier on the database
 * @param {string} userName The name that the user want to use in Qapla
 */
export function createUserName(uid, userName) {
    /**
     * We use city to save the userName in uppercase, so we can check if the username is available, the username must be unique
     * doesn't matter CAPS and lowers
     */
    usersRef.child(uid).update({ userName, city: userName.toUpperCase() });
}

/**
 * Update the userName of specific user only if that username is not already in use
 * @param {string} userName The name that the user want to use in Qapla
 */
export async function validateUserName(userName) {
    if (userName !== '') {
        const usedUsername = await usersRef.orderByChild('city').equalTo(userName.toUpperCase()).once('value');
        return !usedUsername.exists();
    }

    return false;
}

/**
 * Function to add the game and gamertag of a user
 *
 * @param {string} uid User identifier from database
 * @param {string} userName Name from the user
 * @param {string} platform Platform to add gamertag (one of: pc, xbox, ps4, switch)
 * @param {string} gameKey Key of the game to add
 * @param {string} gamerTag Tag of the user (the user must insert this value)
 */
export async function addGameToUser(uid, userName, platform, gameKey, gamerTag) {
    try {
        const gameList = await usersRef.child(uid).child('gameList').once('value');

        if (gameList.exists()) {
            // Add the gameKey on gameList of the user with the correct index (gameList.numChildren() is the index)
            await usersRef.child(uid).child('gameList').child(gameList.val().length).set(gameKey);
        } else {
            await usersRef.child(uid).child('gameList').child(0).set(gameKey);
        }
        var gamerTagChildNode = {};

        switch (platform) {
            case 'pc_white':
                if (gameKey === 'aClash') {
                    gamerTagChildNode = {key: 'clashTag', value: gamerTag};
                } else if (gameKey === 'pcLol'){
                    gamerTagChildNode = {key: 'lolTag', value: gamerTag};
                } else if (gameKey === 'pHearth' || gameKey === 'pOver'){
                    gamerTagChildNode = {key: 'battlenet', value: gamerTag};
                } else {
                    gamerTagChildNode = { key: gameKey, value: gamerTag };
                }
                break;
            case 'ps4_white':
                gamerTagChildNode = {key: 'psn', value: gamerTag};
                break;
            case 'xbox_white':
                gamerTagChildNode = {key: 'xboxLive', value: gamerTag};
                break;
            case 'switch_white':
                gamerTagChildNode = {key: 'NintendoID', value: gamerTag};
                break;
            default:
                gamerTagChildNode = { key: gameKey, value: gamerTag };
                break;
        }

        await usersRef.child(uid).child('gamerTags').update({ [gamerTagChildNode.key]: gamerTagChildNode.value});

        const gameAdded = gamersRef.child(gameKey).push({
            gameExp: 0,
            gameLoses: 0,
            gameName: gameKey,
            gameWins: 0,
            gamelvl: 0,
            userName,
            userUid: uid
        });

        await usersRef.child(uid).child('games').child(gameKey).push(gameAdded.key);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Update the value of the user gamertag
 * @param {string} uid User identifier
 * @param {string} platform Platform key: platformName_white
 * @param {string} gameKey Key of the game
 * @param {string} newGamerTag New gamer tag value
 */
export function updateUserGamerTag(uid, platform, gameKey, newGamerTag) {
    const gamerTagKey = getGamerTagKeyWithGameAndPlatform(platform, gameKey);
    usersRef.child(uid).child('gamerTags').update({ [gamerTagKey]: newGamerTag});
}

/**
 * Get the current commission that qapla set for each match
 */
export async function getCurrentQaplaCommission() {
    try {
        return await commissionRef.once('value').then((commission) => commission.val());
    } catch (error) {
        console.error(error);
    }
}

/**
 * Create a public match
 * @param {string} uid INPUT user identifier of the match creator
 * @param {number} bet INPUT bet of the match
 * @param {string} game INPUT gameKey of the game selected to play
 */
export async function createPublicMatch(uid, bet, game) {
    try {
        const dateObject = new Date();
        const hour = dateObject.getUTCHours() < 10 ? '0' + dateObject.getUTCHours() : dateObject.getUTCHours();
        const minutes = dateObject.getUTCMinutes() < 10 ? '0' + dateObject.getUTCMinutes() : dateObject.getUTCMinutes();
        const date = dateObject.getUTCDate() < 10 ? '0' + dateObject.getUTCDate() : dateObject.getUTCDate();
        const month = dateObject.getUTCMonth()+1 < 10 ? '0' + (dateObject.getUTCMonth()+1) : (dateObject.getUTCMonth()+1);
        const UTCTimeStamp = new Date(dateObject.getUTCFullYear(), month, date, hour, minutes, dateObject.getUTCSeconds(), 0).getTime();
        const matchObject = {
            adversary1: uid,
            adversary2: '',
            alphaNumericIdMatch: randomString(),
            bet,
            date: `${date}/${month}`,
            game: game.gameKey,
            hora: parseFloat(`${hour}.${minutes}`),
            hour: `${hour}:${minutes}`,
            hourResult: '',
            numMatches: '1',
            observations: '',
            pickResult1: '0',
            pickResult2: '0',
            platform: game.platform,
            privado: '',
            resultPlay1: '0',
            resultPlay2: '0',
            timeStamp: TimeStamp,
            // winBet is the bet multiplied x2 cause must be the sum of the bet of the two adversary's
            winBet: bet * 2
        };
        const createdMatch = await matchesRef.push(matchObject);
        await matchesRef.child(createdMatch.key).update({ idMatch: createdMatch.key });
        return createdMatch.key;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Remove the specified quantity of qaploins from a user
 * @param {string} uid INPUT user identifier to substract the qaploins
 * @param {number} currentCredits INPUT The current number of qaploins of the user
 * @param {number} quantityToSubstract INPUT The amount of qaploins to substract
 */
export async function substractQaploinsToUser(uid, currentCredits, quantityToSubstract) {
    try {
        return await usersRef.child(uid).update({ credits: currentCredits - quantityToSubstract});
    } catch (error) {
        console.error(error);
    }
}

/**
 * Return the URL of the given user
 * @param {string} uid user identifier from firebase
 */
export async function getProfileImageWithUID(uid) {
    try {
        const photoUrlSnap = await usersRef.child(uid).child('photoUrl').once('value');
        return photoUrlSnap.val();
    } catch (error) {
        console.error(error);
    }
}

/**
 * Get the game name based on the matchId
 * @param {string} matchId Match identifier in the database
 */
export async function getGameNameOfMatch(matchId) {
    try {
        let game = 'Juego no encontrado';
        const gameKeySnap = await matchesRef.child(matchId).child('game').once('value');
        const gameKey = gameKeySnap.val();
        const platformSnap = await matchesRef.child(matchId).child('platform').once('value');

        switch(platformSnap.val()) {
            case 'pc_white':
                if (gameKey === 'aClash') {
                    game = 'Clash Royale';
                } else if (gameKey === 'pcLol') {
                    game = 'LOL';
                } else if (gameKey === 'pHearth') {
                    game = 'Hearthstone';
                } else if (gameKey === 'pOver') {
                    game = 'Overwatch';
                } else {
                    if (store.getState().gamesReducer.games[platformSnap.val()][gameKey]) {
                        game = store.getState().gamesReducer.games[platformSnap.val()][gameKey].name;
                    }
                }
                break;
            case 'ps4_white':
                if (gameKey === 'psFifa') {
                    game = 'FIFA 19';
                } else if (gameKey === 'psOver') {
                    game = 'Overwatch';
                }
                break;
            case 'switch_white':
                    if (gameKey === 'swSmash') {
                        game = 'Smash brothers';
                    }
                break;
            case 'xbox_white':
                if (gameKey === 'xFifa') {
                    game = 'FIFA 19';
                } else if (gameKey === 'xGears') {
                    game = 'Gears of War';
                } else if (gameKey === 'xHalo') {
                    game = 'Halo';
                } else if (gameKey === 'xOver') {
                    game = 'Overwatch';
                }
                break;
            default:
                if (store.getState().gamesReducer.games[platformSnap.val()] && store.getState().gamesReducer.games[platformSnap.val()][gameKey]) {
                    game = store.getState().gamesReducer.games[platformSnap.val()][gameKey].name;
                }
                break;
        }
        return game;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Return the data of a match
 * @param {string} matchId Identifier of the match in the database
 */
export async function getMatchWitMatchId(matchId) {
    try {
        const matchSnap = await matchesRef.child(matchId).once('value');
        return matchSnap.val();
    } catch (error) {
        console.error(error);
    }
}

/**
 * Notify to the creator of the match that an user wants to challenge him
 * @param {string} uidMatchCreator INPUT The user identifier of the user who has created the match
 * @param {string} uidMatchChallenger INPUT The user identifier of the user who wants to challenge the match
 * @param {string} idMatch INPUT The identifier of the match
 */
export async function challengeUser(uidMatchCreator, uidMatchChallenger, idMatch) {
    try {
        return await usersRef.child(uidMatchCreator).child('notificationMatch').push({
            idEquipo: '',
            idMatch,
            idUserSend: uidMatchChallenger,
            type: 'reta',
            userName: await getUserNameWithUID(uidMatchChallenger)
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * @description Decline a proposal of match
 * @param {string} uid User id of the user who decline the match
 * @param {string} notificationId Id of the notification
 */
export async function declineMatch(uid, notificationId) {
    try {
        /*
            Decline a match only implies delete the notification from the notificationMatch node
            of the user who receives it (challenged user)
        */
        return await deleteNotification(uid, notificationId);
    } catch (error) {
        console.error(error);
    }
}

// -----------------------------------------------
// Notifications
// -----------------------------------------------

/**
 * @description Delete a notification with notificationId
 * @param {string} uid User id of the user who decline the match
 * @param {string} notificationId Id of the notification
 */
export async function deleteNotification(uid, notificationId) {
    try {
        return await usersRef.child(uid).child('notificationMatch').child(notificationId).remove();
    } catch (error) {
        console.error(error);
    }
}

/**
 * @description
 * Checks if a challenge notification for a match created by a particular user already exists.
 *
 * @param {string} matchCreatorUid    User id of the user who created the match
 * @param {string} matchChallengerUid User id of the user who challenges the match
 * @param {string} matchId            Id of the match
 */
export async function isMatchAlreadyChallenged(matchCreatorUid, matchChallengerUid, matchId)
{
    let res = false;

    try {
        // Retrieve the notificationMatch Node with its childs ordered by order considering
        // the idUserSend. Why idUserSend? Because it's much more efficient to order by
        // idUsersend rather than matchId. Reason to say much more efficient is that the
        // ChallengedUser might have several notifications for a match 'A', whereas it will
        // have much more fewer notifications from the ChallengerUser.
        const notArrSnap = await usersRef.child(matchCreatorUid).child('notificationMatch').orderByChild('idUserSend').equalTo(matchChallengerUid).once('value');
        const notArr = notArrSnap.val();

        if (notArr !== null && notArr !== undefined) {

            // Object.keys returns an array of keys from the notArr. The method 'some' compares and returns
            // true as soon as the comparison produces 'true', otherwise it will keep iterating until the end.
            res = Object.keys(notArr).some((key) => {

                // notArr is an Object that contains multiple properties with the value of an uuid of
                // a notification, which each have their onw properties as an Object. Therefore the
                // notArr[key] operation to access the Object, and .matchId to access the prop. from the
                // notification Object.
                return notArr[key].idMatch === matchId;
            });
        }
    } catch (error) {
        console.error(error);
    }

    return res;
}

/**
 * Save the Firebase Cloud Messaging (FCM) token of the user in their profile
 * @param {string} uid User identifier on the database
 * @param {string} token FCM token (unique number to send push notifications to the user)
 */
export async function saveFCMUserToken(uid, token) {
    try {
        await usersRef.child(uid).update({ token });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Mark as read an activity notification
 * @param {string} uid User identifier on the database
 * @param {string} notificationId Notification identifier on the database
 */
export function markActivityNotificationAsRead(uid, notificationId) {
    usersRef.child(uid).child('notification').child(notificationId).update({ notiChecked: true });
}


/**
 * Mark as read a match notification
 * @param {string} uid User identifier on the database
 * @param {string} notificationId Notification identifier on the database
 */
export function markMatchNotificationAsRead(uid, notificationId) {
    usersRef.child(uid).child('notificationMatch').child(notificationId).update({ notiChecked: true });
}

// -----------------------------------------------
// Qaploins
// -----------------------------------------------

/**
 * @description
 * Check that a user has >= Qaploins than the match bet.
 *
 * @param {string}  idUserSend  Id of the user that challenged a match
 * @param {string}  matchId     Id of the match consulted
 *
 */
export async function userHasQaploinsToPlayMatch(idUserSend, matchId) {
    try {
        let numQaploinsSnap = await usersRef.child(idUserSend).child('credits').once('value');
        let numQaploins = numQaploinsSnap.val();

        let matchBetSnap = await matchesRef.child(matchId).child('bet').once('value');
        let matchBet = matchBetSnap.val();

        return numQaploins >= matchBet;
    } catch (error) {
        console.error(error);
    }
}

// -----------------------------------------------
// Matches
// -----------------------------------------------

/**
 * @description Upload the result of a match from the current user
 * @param {string} idMatch Identifier of the match on database
 * @param {number} adversary Indicates if the user is the adversary1 or the adversary2
 * @param {enum} result 1 for won, 0 for lost, 7 for other
 * @param {string} evidence url of the clutch evidence
 */
export async function uploadMatchResult(idMatch, adversary, result, evidence) {
    const dateObject = new Date();

    // If the current hour is less than 10, for example 1, we add a 0 to make looks like 01
    const hour = dateObject.getUTCHours() < 10 ? '0' + dateObject.getUTCHours() : dateObject.getUTCHours();

    // If the current minute is less than 10, for example 1, we add a 0 to make looks like 01
    const minutes = dateObject.getUTCMinutes() < 10 ? '0' + dateObject.getUTCMinutes() : dateObject.getUTCMinutes();
    const hourResult = `${hour}:${minutes}`;

    // Check what adversary is trying to upload the result, for add the data in the correct childs
    if (adversary === 1) {
        matchesPlayRef.child(idMatch).update({ resultPlay1: result, pickResult1: '1', hourResult, clutch1: evidence });
    } else if (adversary === 2) {
        matchesPlayRef.child(idMatch).update({ resultPlay2: result, pickResult2: '1', hourResult, clutch2: evidence });
    }
}

// -----------------------------------------------
// Logros
// -----------------------------------------------

/**
 * @description
 * Get active logros that Qapla has
 *
 * @returns active logros in JSON format
 */
export async function getQaplaActiveLogros() {
    try {
        const logrosSnap = await logrosActRef.once('value');
        return logrosSnap.val();
    } catch (error) {
        console.error(error);
    }
}

/**
 * @description
 * Save a picture to 'storageLogrosImgRef/logroId/idUser.jpg'
 *
 * @param {string} logroId    Logro identifier
 * @param {string} userId     User identifier
 *
 * @returns
 * FAIL    - {Null}    Operation on DB didn't succeed
 * SUCCESS - {Promise} Task Promise tracking completeness of operation
 */
export async function saveImgEvidenceUrlLogroSocial(logroId, userId) {
    let res = null;

    try {
        res = await veriLogroSocialRef.child(logroId).child(userId).set({
            photoUrl: 'facebook_likes/' + logroId + '/' + userId
        });
    } catch (error) {
        console.error(error);
    }

    return res;
}

/**
 * @description
 * Creates an entry for logroIncompleto node with the info
 * regarding the logro status. Once completed the logro, this entry
 * should be moved to logroCompleto
 *
 * @param {string} logroId    Logro identifier
 * @param {string} userId     User identifier
 *
 * @returns
 * FAIL    - {Null}    Operation on DB didn't succeed
 * SUCCESS - {Promise} Task Promise tracking completeness of operation
 */
export async function createLogroIncompletoChild(logroId, userId) {
    let res = null;

    try {
        res = await logrosRef.child(userId).child('logroIncompleto').child(logroId).set({
            puntosCompletados: 0,
            redimido: false,
            totalPuntos: 1
        });
    } catch (error) {
        console.error(error);
    }

    return res;
}

/**
 * Save the request of the user to join to the given event so the streamer can approve or
 * reject it later
 * @param {string} eventId Event identifier
 * @param {string} uid User identifier
 * @param {number} eventEntry Entry paid by the user to join event
 * @param {object} userData Required data for the event (is different depending the game or the event format)
 */
export async function sendRequestToJoinEvent(eventId, uid, eventEntry, userData = {}) {
    const user = store.getState().userReducer.user;
    userData.email = user.email;
    userData.userName = user.userName,
    userData.token = user.token;
    userData.timeStamp = TimeStamp;
    userData.eventEntry = eventEntry;

    await eventsRequestsRef.child(eventId).child(uid).update(userData);
}

/**
 * Check if the given user has a request to join to the given event
 * @param {string} uid User identifier
 * @param {string} eventId Event identifier
 */
export async function userHasRequestToJoinEvent(uid, eventId) {
    return (await eventsRequestsRef.child(eventId).child(uid).once('value')).exists();
}

/**
 * Check if the given user is a participant of the given event
 * @param {string} uid User identifier
 * @param {string} eventId Event identifier
 */
export async function isUserParticipantOnEvent(uid, eventId) {
    return (await eventParticipantsRef.child(eventId).child(uid).once('value')).exists();
}

// -----------------------------------------------
// Verification
// -----------------------------------------------

/**
 * Write a request for verification on the database
 * @param {string} uid user identifier on database
 * @param {object} verificationInfo Object with the necessary information to write the request
 */
export function createVerificationRequest(uid, verificationInfo) {
    verificationOnProccessRef.child(uid).set(verificationInfo);
    cuentasVerificadasRef.child(uid).set(verificationInfo);
}

// -----------------------------------------------
// Feedback
// -----------------------------------------------

/**
 * Writes a message feedback from the user to feedbackUsersRef
 *
 * @param {string} message Comment written by the user
 * @param {string} userId  User identifier on database
 *
 * @returns
 * FAIL    - {Null}    Operation on DB didn't succeed
 * SUCCESS - {Promise} Promise from operation
 */
export async function sendUserFeedback(message, userId) {
    let res = null;
    const date = new Date();
    const year = date.getUTCFullYear();
    // The months with this functions start from 0 (January = 0)
    const month = date.getUTCMonth() + 1;
    const dayHourMinuteSecond = date.getUTCDay().toString() + ' d:' + date.getUTCHours().toString() + ' h:' + date.getUTCMinutes().toString() + ' m:' + date.getUTCSeconds().toString() + ' s';

    try {
        res = await feedbackUsersRef.child(year).child(month).child(userId).push({
            timestamp: dayHourMinuteSecond,
            message: message
        });
    } catch (error) {
        console.error(error);
    }

    return res;
}

// -----------------------------------------------
// Tournaments
// -----------------------------------------------

/**
 * @deprecated
 * Allow the user to join the given event
 * @param {string} uid User identifier on database
 * @param {string} eventId Event identifier on the database
 * @param {string} gamerTag GamerTag selected by the user for the event
 */
export function joinEvent(uid, eventId, gamerTag) {
    const user = store.getState().userReducer.user;
    eventParticipantsRef.child(eventId).child(uid).update({
        email: user.email,
        priceQaploins: 0,
        matchesPlayed: 0,
        victories: 0,
        userName: user.userName,
        gamerTag,

        /**
         * If the user won something in the event and we want to notify him/her,
         * saving the token on this node allows us to accomplish this this with minimal cost
         */
        token: user.token
    });
}

/**
 * Allow the user to join the given event
 * @param {string} uid User identifier on database
 * @param {string} eventId Event identifier on the database
 * @param {number} eventEntry Entry paid by the user to join event
 * @param {object} participantData Required data for the event (is different depending the game or the event format)
 */
export function joinEventWithCustomData(uid, eventId, eventEntry, participantData) {
    const user = store.getState().userReducer.user;
    eventParticipantsRef.child(eventId).child(uid).update({
        email: user.email,
        priceQaploins: 0,
        matchesPlayed: 0,
        victories: 0,
        userName: user.userName,
        ...participantData,
        timeStamp: TimeStamp,
        eventEntry,

        /**
         * If the user won something in the event and we want to notify him/her,
         * saving the token on this node allows us to accomplish this this with minimal cost
         */
        token: user.token
    });
}

/**
 * Allow the user to join in the given tournament
 * @param {string} uid User identifier on database
 * @param {string} tournamentId Tournament identifier on the database
 * @param {number} totalPuntos The total of points of the tournament
 */
export async function joinInTournament(uid, tournamentId, totalPuntos) {
    pointsTournamentsRef.child(uid).child(tournamentId).update({
        puntosCompletados: 0,
        redimido: false,
        totalPuntos
    });
}

// -----------------------------------------------
// Announcements
// -----------------------------------------------

/**
 * Gets all active announcements from database
 *
 * @returns
 * FAIL    - {Array}  Empty array when operation on DB didn't
 *                    succeed or have no announcements on the database
 * SUCCESS - {Array}  Array got from operation
 */
export async function getAnnouncements() {
    let res = [];

    try {
        const dbResultSnap = await announcementsActRef.once('value');
        let dbResJson = dbResultSnap.val();

        let keys = Object.keys(dbResJson);
        keys.map((item) => {
            res.push(dbResJson[item]);
        });
    } catch (error) {
        console.error(error);
    }

    return res;
}


// -----------------------------------------------
// User profile
// -----------------------------------------------

/**
 * Update the discord tag of the given user
 * @param {string} uid User identifier on the database
 * @param {string} discordTag The value of the tag (data to update on the database)
 */
export async function updateUserDiscordTag(uid, discordTag) {
    try {
        await usersRef.child(uid).update({ discordTag });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Update the bio of the user
 * @param {string} uid User identifier on the database
 * @param {string} bio The value of the biograpy to save
 */
export async function updateUserBio(uid, bio) {
    try {
        await usersRef.child(uid).update({ bio });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Update the user profile image
 *
 * @param {string} uid    User identifier on the database
 * @param {string} imgUrl The fullPath from the local image to upload to DB
 */
export async function updateUserProfileImg(uid, photoUrl) {
    try {
        await usersRef.child(uid).update({ photoUrl });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Change user language database propertie when the user change the language of their device
 * and update user topic subscriptions for new ones related to the new language
 * @param {string} uid User identifier
 */
export async function updateUserLanguage(uid) {
    try {
        const userProfileLanguage = (await usersRef.child(uid).child('language').once('value')).val();
        const userDeviceLanguage = getLocaleLanguage();

        // TODO: Uncomment in the next version of the app
        // if (userProfileLanguage !== userDeviceLanguage) {
            usersRef.child(uid).update({ language: userDeviceLanguage });
            const userSubscriptions = await getAllUserTopicSubscriptions(uid);

            if (userSubscriptions.val()) {
                /**
                 * The structure of the userSubscriptions object is the next:
                 * { games: { topic1, topic2 }, events: { topic3, topic4 } ... }
                 * We want the fields inside of the global keys (games and events)
                 * thats why we use a double forEach
                 */
                Object.keys(userSubscriptions.val()).forEach((userGlobalSubscription) => {
                    Object.keys(userSubscriptions.val()[userGlobalSubscription]).forEach((topicName) => {

                        /**
                         * Split the topicName variable, the topicName variable have the form:
                         * topicKey_language, we need the topicKey to update the language,
                         * the split function returns an array, the first index (index 0)
                         * of that array is the topicKey, thats why we save that data on
                         * this constant
                         */
                        const topicNameWithoutLanguage = topicName.split('_')[0];
                        const newTopicName = `${topicNameWithoutLanguage}_${userDeviceLanguage}`;

                        /**
                         * An error was introduced with the events topics, the key of the node
                         * event of the userSubscriptions constant was saved as undefined, this
                         * code is for solve this problem, we can remove it on the future
                        */
                        if (userGlobalSubscription === 'undefined') {
                            unsubscribeUserFromTopic(topicName);
                            removeUserSubscriptionToTopic(uid, topicName, userGlobalSubscription);

                            subscribeUserToTopic(newTopicName, uid, EVENTS_TOPIC, false);
                        } else {
                            unsubscribeUserFromTopic(topicName);
                            removeUserSubscriptionToTopic(uid, topicName, userGlobalSubscription);

                            subscribeUserToTopic(newTopicName, uid, userGlobalSubscription, false);
                        }
                    });
                });
            // }
        }
    } catch (error) {
        console.error(error);
    }
}


/**
 * Set the status of the account of an specific user
 * (if he/she have their account opened or closed)
 * @param {boolean} isUserLogged True if the user is not logged
 */
export function updateUserLoggedStatus(isUserLogged, uid = '') {

    /**
     * This flag was not part of the original app, thats why we use inverse logic here
     * so if the data does not exist on the profile we can assume that the user is logged.
     * In other words is not loggedOut
     */
    usersRef.child(uid || store.getState().userReducer.user.id).update({ isUserLoggedOut: !isUserLogged });
}

/**
 * Remove all the database listeners related to the userReducer
 * @param {string} uid User identifier
 */
export function removeUserListeners(uid) {
    usersRef.child(uid).off('child_added');
    usersRef.child(uid).off('child_changed');
    usersRef.child(uid).off('child_removed');
}

/**
 * Remove all the database listeners related to the logrosReducer
 * @param {string} uid User identifier
 */
export function removeLogrosListeners(uid) {
    cuentasVerificadasRef.child(uid).off('value');
    logrosRef.child(uid).child('logroCompleto').off('child_added');
    logrosRef.child(uid).child('logroIncompleto').off('value');
    pointsTournamentsRef.child(uid).off('value');
}

/**
 * Remove the database listener related to an specific event
 * @param {string} uid User identifier
 * @param {string} eventKey Event identfier
 */
export function removeActiveEventUserSubscribedListener(uid, eventKey) {
    eventParticipantsRef.child(eventKey).child(uid).off('value');
}

/**
 * Games
 */

/**
 * Set a listener on the games resources node
 * @param {function} callback Handle the returned data
 */
export function listenForGamesResourcesChanges(callback) {
    gamesRef.on('value', callback);
}

/**
 * Return the games resources just once
 */
export async function getGamesResources() {
    return await gamesRef.once('value');
}

/**
 * User Subscriptions
 */

/**
  * Saves topics on the database which the user has been subscribed on Firebase Cloud Messaging
  * @param {string} uid User identifier on the database
  * @param {string} topic Name of the topic to which the user has subscribed
  * @param {string} type Key of the category of the topic
  */
export function saveUserSubscriptionToTopic(uid, topic, type) {
    userTopicSubscriptions.child(uid).child(type).update({ [topic]: true });
}

/**
  * Removes topics on the database which the user has been unsubscribed on Firebase Cloud Messaging
  * @param {string} uid User identifier on the database
  * @param {string} topic Name of the topic to which the user has unsubscribed
  * @param {string} type Key of the category of the topic
  */
 export function removeUserSubscriptionToTopic(uid, topic, type) {
    userTopicSubscriptions.child(uid).child(type).child(topic).remove();
}

/**
 * Update the notificationPermission flag of the given type
 * @param {string} notificationType Key of the category of the topics
 * @param {boolean} value True if the user allow push notifications
 */
export function updateNotificationPermission(notificationType, value) {
    usersRef.child(store.getState().userReducer.user.id).child('notificationPermissions').update({ [notificationType]: value });
}

/**
 * Return a snapshot with the list of the user topics of the given type
 * @param {string} type Key of the category of the topics
 */
export async function getUserTopicSubscriptions(type) {
    return await userTopicSubscriptions.child(store.getState().userReducer.user.id).child(type).once('value');
}

/**
 * Returns the user topic subscription object
 * Notes: { Games: { topic1, topic2 }, Events: { topic3, topic4 } ... }
 * @param {string} uid User identifier
 * @returns {Object | null} JSON that contains all the user subscriptions or null if the user does
 * not have any subscription
 */
export async function getAllUserTopicSubscriptions(uid) {
    return await userTopicSubscriptions.child(uid).once('value');
}

/**
 * Check if the user allows push notifications on a given topic
 * @param {string} notificationType Key of the notification permission to check
 */
export async function userAllowsNotificationsFrom(notificationType, uid) {
    let permissionStatus = true;

    /**
     * Load from database the push notifications permissions, use this instead of redux to check the permissions
     * correctly if the user is recently logged in
     */
    const notificationsPermissions = (await usersRef.child(uid).child('notificationPermissions').once('value')).val();

    if (notificationsPermissions && notificationsPermissions.hasOwnProperty(notificationType)) {
        permissionStatus = notificationsPermissions[notificationType];
    }

    return permissionStatus;
}

// -----------------------------------------------
// Privacy terms
// -----------------------------------------------

/**
 * Gets the privacy terms from the Qapla App
 * @returns
 * SUCCESS - {Array}  Content of Qapla app privacy terms.
 * FAIL    - {Array}  Empty array
 */
export async function getQaplaAppPrivacy() {
    let res = [];

    try {
        const textSnap = await privacyRef.child('text').once('value');
        let text = textSnap.val();

        res = text.split(DB_NEW_LINE_SEPARATOR);
    } catch (error) {
        console.error(error);
    }

    return res;
}

/**
 * Add a real time listener for the userQaplaBalance node
 * @param {string} uid User identifier
 * @param {function} callback Handler for the 'value' event of the userQaplaBalance node
 */
export async function userQaplaBalanceListener(uid, callback) {
    usersBalance.child(uid).on('value', callback);
}

// -----------------------------------------------
// App versioning
// -----------------------------------------------

/**
 * Retrieves the major version of the app from server
 * @returns
 * SUCCESS - {string}     res major version of QaplaGaming app retrieved from server
 * FAIL    - {null}  res no major version was not retrieved
 */
export async function dbGetAppVersion() {
    let res = null;

    try {
        let resSnap = await versionAppRef.once('value');
        res = resSnap.val();
    } catch(error) {
        console.error(error);
    }

    return res;
}

/**
 * Retrieves a value listener to QaplaVersion child
 * @param {function} callback callback provided by the caller
 */
export async function dbEnableAppVersionValueListener(callback) {
    versionAppRef.on('value', callback);
}

/**
 * Removes a value listener
 */
export async function dbRemoveAppVersionValueListener() {
    versionAppRef.off('value');
}

/**
 * Exchange Qoins
 */

/**
 * Get the url for the user to donate to streamers
 */
export async function getDonationFormUrl() {
    return (await qoinsDonationFormUrlRef.once('value')).val();
}

/**
 * Qapla Store
 */

/**
  * Load the specified amount of products of the Qapla store
  * @param {number} limit Number of products to load
  */
export async function getQaplaStoreProducts() {
    return await qaplaStoreRef.once('value');
}

/**
  * Get the cheaper product of the Qapla Store
  */
export async function getQaplaStoreCheaperProduct() {
    return await qaplaStoreRef.orderByChild('price').limitToFirst(1).once('value');
}

/**
 * User Rewards Progress
 */

/**
 * Put a listener to load all the changes on the UsersRewardsProgress user node
 * @param {string} uid User identifier
 * @param {callback} callback Callback to handle the response of the listener
 */
export function loadUserRewards(uid, callback) {
    usersRewardsProgressRef.child(uid).on('value', callback);
}

/**
 * Donations costs
 */

/**
 * Get the base of Qoins considered in the ECoin To Qoin equation
 */
export async function getDonationQoinsBase() {
    return await DonationsCostsRef.child('QoinsBase').once('value');
}

/**
 * Donations Leader Board
 */

/**
 * Get the number of winners in the current leaderboard season
 */
export async function getLeaderboardWinnersNumber() {
    return await leaderboardWinnersRef.once('value');
}

/**
 * Get the first X number of users in the leader board
 */
export async function getDonationsLeaderBoard(numberOfUsers) {
    return await DonationsLeaderBoardRef.orderByChild('totalDonations').limitToLast(numberOfUsers).once('value');
}

/**
 * Get the users values of the leader board
 */
export async function getUserDonationLeaderBoard(uid) {
    return await DonationsLeaderBoardRef.child(uid).once('value');
}

/**
 * Leader Board Prizes
 */

 /**
  * Returns the list of the leader board prizes
  */
 export async function getLeaderBoardPrizes() {
    return await LeaderBoardPrizesRef.once('value');
 }

 export async function getCommunitySurvey() {
    return await database.ref('/CommunitySurvey').once('value');
 }

/**
 * Get the records of the user activity (on UserStreamsRewards) from the last 7 days
 * @param {string} uid User identifier
 */
 export async function listenUserActivityFromLast7Days(uid, callback) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const sevenDaysInMilliseconds = 604800000;
    userStreamsRewardsRef.child(uid).orderByChild('timestamp').startAt(date.getTime() - sevenDaysInMilliseconds).on('value', callback);
 }

/**
 * Mark the given records as read on the database
 * @param {string} uid User identifier
 * @param {array} recordsArray Array of id´s of unread activity records
 */
 export async function setActivityRecordsAsRead(uid, recordsArray = []) {
    const recordsUpdate = {};
    recordsArray.forEach((record) => {
        recordsUpdate[`/${uid}/${record}/read`] = true;
    });

    userStreamsRewardsRef.update(recordsUpdate);
 }