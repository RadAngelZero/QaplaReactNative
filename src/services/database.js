// josep.sanahuja - 08-07-2019 - us83 - Removed navigation from 'createUserName'

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
        console.log("muuu " + JSON.stringify(data));
        switch (platform) {
            case 'pc_white':
                if (game === 'aClash') {
                    return {
                        gamerTag: data.val().clashTag
                    }
                } else if (game === 'pcLol'){
                    return {
                        gamerTag: data.val().lolTag
                    }
                } else if (game === 'pHearth' || game === 'pOver'){
                    return {
                        gamerTag: data.val().battlenet
                    }
                }
                break;
            case 'ps4_white':
                return {
                    gamerTag: data.val().psn
                }
            case 'xbox_white':
                return {
                    gamerTag: data.val().xboxLive
                }
            case 'switch':
                // return {
                //     gamerTag: data.val().NintendoID
                // }
                break;
            case 'switch_white':

               break;
            default:
                break;
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

export async function addGameToUser(uid, platform, gameKey, gamerTag) {
    const nextIndex = await usersRef.child('gameList').once('value').then((gameList) => gameList);
    console.log("[addGameToUser] : index :  " + JSON.stringify(nextIndex));
    if (nextIndex.exists()) {
        console.log(nextIndex.numChildren);
        console.log("[addGameToUser] : gameKey1 :  " + gameKey);
        await usersRef.child(uid).child('gameList').child([nextIndex.numChildren]).set(gameKey);
    } else {
        console.log("[addGameToUser] : gameKey2 :  " + gameKey);
        await usersRef.child(uid).child('gameList').child(0).set(gameKey);
    }
    var gamerTagChildNode = {};
    switch (platform) {
        case 'pc':
            if (gameKey === 'aClash') {
                gamerTagChildNode = {key: 'clashTag', value: gamerTag};
            } else if (gameKey === 'pcLol'){
                gamerTagChildNode = {key: 'lolTag', value: gamerTag};
            } else if (gameKey === 'pHearth' || gameKey === 'pOver'){
                gamerTagChildNode = {key: 'battlenet', value: gamerTag};
            }
            break;
        case 'ps4':
            gamerTagChildNode = {key: 'psn', value: gamerTag};
            break;
        case 'switch':
            gamerTagChildNode = {key: 'NintendoID', value: gamerTag};
            break;
        case 'xbox':
            gamerTagChildNode = {key: 'xboxLive', value: gamerTag};
            break;
        default:
            return Promise.reject();
    }
    console.log("[addGameToUser] : gameKey4 :  ");
    await usersRef.child(uid).child('gamerTags').child(gamerTagChildNode.key).set(gamerTagChildNode.value);
    console.log("[addGameToUser] : gameKey5 :  ");
    return Promise.resolve();
}