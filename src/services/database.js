// josep.sanahuja - 08-07-2019 - us83 - Removed navigation from 'createUserName'
// diego          - 11-07-2019 - Update getGamerTagWithUID and addGameToUser functions 
//for new references on database and errors detecrted on addGameToUser

import { database } from "../utilities/firebase";

export const matchesRef = database.ref('/Matches');
export const usersRef = database.ref('/Users');
export const gamesRef = database.ref('/Games');

/**
 * Returns the userName of the specified user
 * @param {string} Uid User id from firebase
 */
export async function getUserNameWithUID(Uid) {
    return await usersRef.child(Uid).child('userName').once('value').then((data) => data.val());
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
                    }
                    break;
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
                    break;
            }
        } else {
            return { gamerTag: null };
        }
    });
}

export function createUserProfile(Uid, email) {
    usersRef.child(Uid).set({
        bio: '',
        captain: 'false',
        city: '',
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
        userName: '',
        wins: 0
    });
}

/**
 * Update the userName of specific user only if that username is not already in use
 * @param {string} uid User identifier of the user on firebase
 * @param {string} userName The name that the user want to use in Qapla
 * 
 * Return: {boolean} user was created or otherwise it was not
 */
export async function createUserName(uid, userName, navigation) {
    return await usersRef.orderByChild('city').equalTo(userName.toUpperCase()).once('value').then(async (userNameAlready) => {
        if (!userNameAlready.exists()) {
            await usersRef.child(uid).update({ userName, city: userName.toUpperCase() });
             
            // #us83: Removed return navigation.navigate('Retas'); and replace it with a boolean value
            //.so that it can be consumed by others. Removing the navigation method complies with
            // trying to decouple as much as possible what each method does. This one, creates a UserName
            // in to the database, we delegate navigation to others.
            return true;
        } else {
            //El nombre de usuario ya esta en uso por alguien mas
            return false;
        }
    });
}

/**
 * Function to add the game and gamertag of a user
 * @param {string} uid User identifier from database
 * @param {string} platform Platform to add gamertag (one of: pc, xbox, ps4, switch)
 * @param {string} gameKey Key of the game to add
 * @param {string} gamerTag Tag of the user (the user must insert this value)
 */
export async function addGameToUser(uid, platform, gameKey, gamerTag) {
    const gameList = await usersRef.child(uid).child('gameList').once('value').then((gameList) => gameList);
    if (gameList.exists()) {
        var userAlreadyHaveThisGame = false;
        gameList.forEach((game) => {
            if (game.val() === gameKey) {
                userAlreadyHaveThisGame = true;
            }
        });
        if (userAlreadyHaveThisGame) {
            return Promise.resolve({ message: 'El usuario ya tiene este juego agregado' });
        }
        await usersRef.child(uid).child('gameList').child(gameList.numChildren()).set(gameKey);
    } else {
        console.log("[addGameToUser] : gameKey2 :  " + gameKey);
        await usersRef.child(uid).child('gameList').child(0).set(gameKey);
    }
    var gamerTagChildNode = {};
    switch (platform) {
        case 'pc_white':
            if (game === 'aClash') {
                gamerTagChildNode = {key: 'clashTag', value: gamerTag};
            } else if (game === 'pcLol'){
                gamerTagChildNode = {key: 'lolTag', value: gamerTag};
            } else if (game === 'pHearth' || game === 'pOver'){
                gamerTagChildNode = {key: 'battlenet', value: gamerTag};
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
            break;
    }
    if ((await getGamerTagWithUID(uid, gameKey, platform).then((gamerTag) => gamerTag.gamerTag)) == null) {
        await usersRef.child(uid).child('gamerTags').child(gamerTagChildNode.key).set(gamerTagChildNode.value);
    }
    return Promise.resolve({ message: 'Juego agregado correctamente' });
}
