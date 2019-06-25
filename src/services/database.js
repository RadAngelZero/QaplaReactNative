import { database } from "../utilities/firebase";

export const matchesRef = database.ref('/Matches');
export const usersRef = database.ref('/Users');

export async function getUserDataWithUID(Uid) {
    return await usersRef.child(Uid).once('value').then((data) => data.val());
}