import { database } from "../utilities/firebase";

export const matchesRef = database.ref('/Matches');
export const usersRef = database.ref('/Users');

/**
 * Returns the userName of the specified user
 * @param {string} Uid User id from firebase
 */
export async function getUserNameWithUID(Uid) {
    return await usersRef.child(Uid).child('userName').once('value').then((data) => data.val());
}

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