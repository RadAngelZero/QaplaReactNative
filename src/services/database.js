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
 * Returns the gamerTag of the specified user and the game and platform of the current match
 * @param {string} Uid User id from firebase
 * @param {string} game Name of the game of the current match
 * @param {string} platform Name of the platform of the current match
 */
export async function getGamerTagWithUID(Uid, game, platform) {
    return await usersRef.child(Uid).child('gamerTags').once('value').then((data) =>
    {
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
 */
export async function createUserName(uid, userName, navigation) {
    return await usersRef.orderByChild('city').equalTo(userName.toUpperCase()).once('value').then(async (userNameAlready) => {
        if (!userNameAlready.exists()) {
            await usersRef.child(uid).update({ userName, city: userName.toUpperCase() });
            return navigation.navigate('Retas');
        } else {
            //El nombre de usuario ya esta en uso por alguien mas
        }
    });
}