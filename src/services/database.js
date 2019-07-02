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