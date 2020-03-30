import { messaging } from '../utilities/firebase';
import {
    userAllowsNotificationsFrom,
    saveUserSubscriptionToTopic,
    getAllUserTopicSubscriptions,
    updateNotificationPermission
} from './database';
import { getLocaleLanguage } from './../utilities/i18';

/**
 * Subscribe a user to a topic, so the user will receive all the notifications
 * related to the given topic (in games topics every gameKey is a topic in FCM)
 * A topic is automatically created when one user subscribes to it
 * @param {string} topic Name of the topic
 * @param {string | null} uid User identifier
 * @param {string} type Type of topic, for example game or event
 * @param {boolean} [addLanguageSuffix = true] False if the topic param already contain the _${language}
 * data. True by default
 */
export function subscribeUserToTopic(topic, uid = '', type, addLanguageSuffix = true) {
    let topicName = '';

    if (addLanguageSuffix) {
        topicName = `${topic}_${getLocaleLanguage()}`;
    } else {
        topicName = topic;
    }

    /**
     * Only if the user allow to receive push notifications of this type
     * we subscribe him
     */
    if (userAllowsNotificationsFrom(type)) {
        messaging.subscribeToTopic(topicName);
    }

    /**
     * If the user is logged with an account we save their subscription to the topic
     * (some topics does not require authentication)
     */
    if (uid) {
        saveUserSubscriptionToTopic(uid, topicName, type);
    }
}

/**
 * Subscribes the user to all the topics he has registered
 * on userTopicSubscriptions node call this function on user sign in,
 * if the user change their device or he/she log in other device for any reason
 * he/she can get push notifications
 * @param {string} uid User identifier
 */
export async function subscribeUserToAllRegistredTopics(uid) {
    const userAllSubscriptions = await getAllUserTopicSubscriptions(uid);

    userAllSubscriptions.forEach((subscriptionType) => {
        updateNotificationPermission(subscriptionType.key, true);

        subscriptionType.forEach((topicName) => {
            subscribeUserToTopic(topicName.key);
        });
    });
}

/**
 * Unsubscribe a user from the given topic
 * @param {string} topic Name of the topic
 */
export function unsubscribeUserFromTopic(topic) {
    messaging.unsubscribeFromTopic(topic);
}

/**
 * Unubscribes the user to all topics he has registered
 * on userTopicSubscriptions node call this function on user sign out,
 * if the user sign out of the device he/she must not receive push notifications
 * related to the topics
 * @param {string} uid User identifier
 */
export async function unsubscribeUserFromAllSubscribedTopics() {
    const userAllSubscriptions = await getAllUserTopicSubscriptions();

    userAllSubscriptions.forEach((subscriptionType) => {
        updateNotificationPermission(subscriptionType.key, false);

        subscriptionType.forEach((topicName) => {
            unsubscribeUserFromTopic(topicName.key);
        });
    });
}