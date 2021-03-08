import { TWITCH_CLIENT_ID } from '../utilities/Constants';

/**
 * Get the info of the given twitch user
 * @param {string} accessToken Twitch user access token
 */
export async function getTwitchUserData(accessToken) {
    const response = await fetch('https://api.twitch.tv/helix/users', {
        method: 'GET',
        headers: {
            'Client-Id': TWITCH_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`
        }
    });
    const user = (await response.json()).data[0];

    return user;
};