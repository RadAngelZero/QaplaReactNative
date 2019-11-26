// josep.sanahuja - 22-11-2019 - us153 - Add getUserProfileImgUrl && saveUserProfileImg
// josep.sanahuja - 08-10-2019 - usXXX - + writeUserVerificationSelfie
// josep.sanahuja - 03-10-2019 - XXXXX - Use Filepath in .put on savePictureEvidenceLogroSocial
//                                       instead of Blob because of react-native-firebase 
// josep.sanahuja - 26-09-2019 - us118 - File creation

import { storage } from "../utilities/firebase";

// storage
export const storageLogrosImgRef = storage.ref('/facebook_likes');
export const verifiedUserImgRef = storage.ref('/verified_user_photos');
export const profileUserImgRef = storage.ref('/profileUser/img');

/**
 * @description 
 * Save a picture to '{storageLogrosImgRef}/{logroId}/{userId}.jpg'
 *
 * @param {string} pictureUri Uri to the picture
 * @param {string} logroId    Logro identifier
 * @param {string} userId     User identifier
 *  
 * @returns
 * FAIL    - {Null}    Operation didn't succeed  
 * SUCCESS - {Promise} Task Promise tracking completeness of operation
 */
export async function savePictureEvidenceLogroSocial(pictureUri, logroId, userId) {
    let res = null;

    try {  
    	// NOTE: (03-10-2019) 
    	// When using react-native-firebase storage.put requires a filepath, not a blob.
    	// When using FirebaseSDK, a Blob is required (Firebase changed the signature of
    	// the put method and replaced the Filepath parameter for a Blob or File object)

    	// Firebase SDK library way of uploading an image to Datastorage
        // const imgFetched = await fetch(pictureUri);
        // res = storageLogrosImgRef.child('/' + logroId + '/' + userId +  '.jpg').put(imgFetched._bodyBlob);
        
        // React-Native-Firebase library way of uploading an image to Datastorage
        res = storageLogrosImgRef.child('/' + logroId + '/' + userId +  '.jpg').put(pictureUri); 
    }
    catch (error) {
        console.error(error);
    }

    return res;
}

/**
 * @description 
 * Saves a picture to '{verifiedUserImgRef}/{userId}.jpg'
 *
 * @param {string} userId     User identifier
 * @param {string} pictureUri Uri to the picture
 *  
 * @returns
 * FAIL    - {Null}    Operation didn't succeed  
 * SUCCESS - {Promise} Task Promise tracking completeness of operation
 */
export async function writeUserVerificationSelfie(userId, pictureUri) {
    let res = null;

    try {
        res = verifiedUserImgRef.child('/' + userId +  '.jpg').put(pictureUri); 
    }
    catch (error) {
        console.error(error);
    }

    return res;
}

/**
 * @description 
 * Save a picture to '{profileUserImgRef}/{userId}.jpg'
 *
 * @param {string} userId     User identifier
 * @param {string} pictureUri Uri to the picture
 *  
 * @returns
 * FAIL    - {Null}    Operation didn't succeed  
 * SUCCESS - {Promise} Task Promise tracking completeness of operation
 */
export async function saveUserProfileImg(userId, pictureUri) {
    let res = null;

    try {  
        // React-Native-Firebase library way of uploading an image to Datastorage
        res = profileUserImgRef.child('/' + userId +  '.jpg').put(pictureUri); 
    }
    catch (error) {
        console.error(error);
    }

    return res;
}

/**
 * @description 
 * Get profile picture URL from user profile from Storage
 *
 * @param {string} userId     User identifier
 *  
 * @returns
 * FAIL    - { Null }    Operation didn't succeed  
 * SUCCESS - { Promise } Image Downloadable URL
 */
export async function getUserProfileImgUrl(userId) {
    let res = null;

    try {  
        const ref = profileUserImgRef.child('/' + userId +  '.jpg');
        res = await ref.getDownloadURL();
    }
    catch (error) {
        console.error(error);
    }

    return res;
}



