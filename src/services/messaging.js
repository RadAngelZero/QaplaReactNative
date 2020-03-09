import { messaging } from '../utilities/firebase';
import { saveUserSubscriptionToTopic } from './database';

/**
 * Subscribe a user to a topic, so the user will receive all the notifications
 * related to the given topic (in games topics every gameKey is a topic in FCM)
 * A topic is automatically created when one user subscribes to it
 * @param {string} topic Name of the topic
 * @param {string | null} uid User identifier
 */
export function subscribeUserToTopic(topic, uid = '') {
    messaging.subscribeToTopic(topic);

    /**
     * If the user is logged with an account we save their subscription to the topic
     * (some topics does not require authentication)
     */
    if (uid !== '') {
        saveUserSubscriptionToTopic(uid, topic);
    }
}