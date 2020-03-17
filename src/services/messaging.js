import { messaging } from '../utilities/firebase';
import { userAllowsNotificationsFrom, saveUserSubscriptionToTopic } from './database';

/**
 * Subscribe a user to a topic, so the user will receive all the notifications
 * related to the given topic (in games topics every gameKey is a topic in FCM)
 * A topic is automatically created when one user subscribes to it
 * @param {string} topic Name of the topic
 * @param {string | null} uid User identifier
 * @param {string} type Type of topic, for example game or event
 */
export function subscribeUserToTopic(topic, uid = '', type) {

    /**
     * Only if the user allow to receive push notifications of this type
     * we subscribe him
     */
    if (userAllowsNotificationsFrom(type)) {
        messaging.subscribeToTopic(topic);
    }

    /**
     * If the user is logged with an account we save their subscription to the topic
     * (some topics does not require authentication)
     */
    if (uid !== '') {
        saveUserSubscriptionToTopic(uid, topic, type);
    }
}

/**
 * Unsubscribe a user from the given topic
 * @param {string} topic Name of the topic
 */
export function unsubscribeUserFromTopic(topic) {
    messaging.unsubscribeFromTopic(topic);
}