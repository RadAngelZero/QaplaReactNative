import { GIPHY_KEY, GIPHY_CLIPS } from '../utilities/Constants';

/**
 * Generates a random id for the user to identify him on Giphy
 * @returns RandomId
 */
export async function generateGiphyUserRandomId() {
    const response = await fetch(`https://api.giphy.com/v1/randomid?api_key=${GIPHY_KEY}`, {
        method: 'get'
    });

    const data = (await response.json()).data;
    let randomId = '';

    if (data) {
        randomId = data.random_id;
    }

    return randomId;
}

/**
 * Get media (gifs, clips or stickers) from Giphy
 * @param {string} userGiphyId User Giphy random identifier
 * @param {('gifs'|'stickers'|'clips')} type Type of media to get
 * @param {number} limit Maximum number of media to get from Giphy
 * @param {number} offset Offset (for pagination)
 * @returns Array of data (gifs, clips, etc.) from Giphy
 */
export async function getGiphyTrending(userGiphyId, type, limit, offset = 0) {
    const response = await fetch(`https://api.giphy.com/v1/${type}s/trending?api_key=${GIPHY_KEY}&random_id=${userGiphyId}&limit=${limit}&offset=${offset}&rating=pg-13&bundle=${type === GIPHY_CLIPS ? 'clips_grid_picker' : 'messaging_non_clips'}`, {
        method: 'get',
    });

    const data = (await response.json()).data;

    return data;
}

/**
 * Search for specific media (gifs, clips or stickers) on Giphy library based on the given search query
 * @param {string} userGiphyId User Giphy random identifier
 * @param {string} searchQuery Search query term or phrase
 * @param {('gifs'|'stickers'|'clips')} type Type of media to get
 * @param {string} lang User language
 * @param {number} limit Maximum number of media to get from Giphy
 * @param {number} offset Offset (for pagination)
 * @returns Array of data (gifs, clips, etc.) from Giphy
 */
export async function searchGiphyMedia(userGiphyId, searchQuery, type, lang, limit, offset) {
    const response = await fetch(`https://api.giphy.com/v1/${type}s/search?api_key=${GIPHY_KEY}&random_id=${userGiphyId}&q=${searchQuery}&lang=${lang}&limit=${limit}&offset=${offset}&rating=pg-13&bundle=${type === GIPHY_CLIPS ? 'clips_grid_picker' : 'messaging_non_clips'}`, {
        method: 'get'
    });

    const data = (await response.json()).data;

    return data;
}