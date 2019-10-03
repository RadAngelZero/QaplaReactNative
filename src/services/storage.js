// josep.sanahuja - 26-09-2019 - us118 - File creation

import { storage } from "../utilities/firebase";

// storage
export const storageLogrosImgRef = storage.ref('/facebook_likes');

/**
 * @description 
 * Save a picture to 'storageLogrosImgRef/logroId/idUser.jpg'
 *
 * @param {string} pictureUri Uri to the picture
 * @param {string} logroId    Logro identifier
 * @param {string} userId     User identifier
 *  
 * @returns
 * FAIL    - {Null}    Operation on DB didn't succeed  
 * SUCCESS - {Promise} Task Promise tracking completeness of operation
 */
export async function savePictureEvidenceLogroSocial(pictureUri, logroId, userId) {
    let res = null;

    try {  
        const imgFetched = await fetch(pictureUri);
        
        res = storageLogrosImgRef.child('/' + logroId + '/' + userId +  '.jpg').put(imgFetched._bodyBlob);
        
    } catch (error) {
        console.error(error);
    }

    return res;
}