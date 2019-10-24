import { messaging } from '../utilities/firebase';

/**
 * Subscribe a user to a topic, so the user will receive all the notifications
 * related to the given topic (in games topics every gameKey is a topic in FCM)
 * A topic is automatically created when one user subscribes to it
 * @param {string} topic Name of the topic
 */
export function subscribeUserToTopic(topic) {
    messaging.subscribeToTopic(topic);
}