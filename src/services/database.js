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