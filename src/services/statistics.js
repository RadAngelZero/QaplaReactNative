import analytics from '@segment/analytics-react-native';

import { SEGMENT_KEY } from '../utilities/Constants';

/**
 * @description Initialize segemnt (necessary to send data to segment)
 */
export async function initializeSegment() {
    try {
        await analytics.setup(SEGMENT_KEY, {
            recordScreenViews: true,
            trackAttributionData: true,

            // Track events like open app, app installed, app backgrounded etc.
            trackAppLifecycleEvents: true,
            // Send the statistics to segment when have 5 events recorded on the local
            flushAt: 5
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * @description Send an event related to screens with custom properties on the event
 *
 * @param {string} screen Name of the recorded screen on the event
 * @param {object} properties Optional data to record on the event
 */
export async function recordScreenOnSegment(screen, properties = {}) {
    try {
        properties.createdAt = new Date().getTime();
        await analytics.screen(screen, properties);
    } catch (error) {
        console.error(error);
    }
}

/**
 * @description Send a event related to track (click buttons, select an option, etc.) with custom properties on the event
 *
 * @param {string} event Event identifier on segment
 * @param {object} properties Optional data to record on the event
 */
export async function trackOnSegment(event, properties = {}) {
    try {
        properties.createdAt = new Date().getTime();
        await analytics.track(event, properties);
    } catch (error) {
        console.error(error);
    }
}

/**
 * @description Link the uid with the sended statistics to segment, so we can identify and filter data
 * based on specific user when we make querys on segment
 *
 * @param {string} uid User identifier on firebase
 * @param {string|null} email Email of the user
 * @param {string|null} username UserName of the user
 * @param {string|null} twitchUsername Username of twitch of the user
 */
export async function setUserIdOnSegment(uid, email, username, twitchUsername) {
    try {
        analytics.identify(uid, {
            email,
            username,
            twitchUsername
        });
    } catch (error) {
        console.error(error);
    }
}
