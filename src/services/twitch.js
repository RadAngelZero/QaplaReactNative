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

/**
 * Returns true if a user is banned on the specified channel
 * @param {string} streamerTwitchId Streamer Twitch identifier
 * @param {string} userTwitchId User Twitch identifier
 * @param {string} streamerAccessToken Streamer Twitch access token
 */
export async function isUserBannedOnStreamerChannel(streamerTwitchId, userTwitchId, streamerAccessToken) {
    try {
        const response = await fetch(`https://api.twitch.tv/helix/moderation/banned?broadcaster_id=${streamerTwitchId}&user_id=${userTwitchId}`, {
            method: 'GET',
            headers: {
                'Client-Id': TWITCH_CLIENT_ID,
                Authorization: `Bearer ${streamerAccessToken}`
            }
        });

        return (await response.json()).data.length > 0;
    } catch (error) {
        return false;
    }
}