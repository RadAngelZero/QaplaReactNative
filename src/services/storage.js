import { storage } from '../utilities/firebase';

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
 * @description Get profile picture URL from user profile from Storage
 *
 * @param {string} userId User identifier
 * @returns
 * FAIL    - { null } Operation didn't succeed
 * SUCCESS - { Promise } Image Downloadable URL
 */
export async function getUserProfileImgUrl(userId) {
    let res = null;

    try {
        const ref = profileUserImgRef.child('/' + userId +  '.jpg');
        res = await ref.getDownloadURL();
    }
    catch (error) {
        console.log('storage.js: getUserProfileImgUrl(userId)', error);
    }

    return res;
}

/**
 * Gets the download URL of our copy of the streamer profile image (it´s a copy of the last image we
 * detected in their Twitch the last time the streamer update their info on their dashboard)
 * @param {string} streamerId Streamer identifier
 */
export async function getStreamerProfilePhotoUrl(streamerId) {
    const ref = storage.ref('/StreamersProfilesPhotos').child(streamerId);
    const profilePhotoUrl = await ref.getDownloadURL();

    return profilePhotoUrl;
}