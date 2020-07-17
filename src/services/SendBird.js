import SendBird from 'sendbird';
import { SENDBIRD_KEY } from '../utilities/Constants';

let sb = new SendBird({ appId: SENDBIRD_KEY });

let currentChannel;
let channelHandler = new sb.ChannelHandler();

/**
 * Initialize the connection between user and SendBird
 * @param {string} uid User identifier (from firebase auth)
 * @param {string} userName UserName to use as nickname with SendBird
 * @param {string} userImg Url of the user image profile photo
 */
export function connectUserToSendBird(uid, userName, userImg) {
    sb.connect(uid, function(user, error) {
        sb.updateCurrentUserInfo(userName, userImg || 'https://lh3.googleusercontent.com/SDf-cdu1zjcFDYM8yyGCxGEKJU8WLy1q34aY8PRMfDUmEW9gbkS3jJ801w86iw5kLBo', (user, error) => {
            if (error) {
                console.error(error);
                return;
            }
        });
        if (error) {
            console.error(error);
            return;
        }
    });
}

/**
 * Get an open channel and all their messages
 * @param {string} channelUrl Url of an open channel
 * @param {callback} setMessagesList Handle the returned messages from the channel
 */
export function getSendBirdOpenChannel(channelUrl, setMessagesList) {
    sb.OpenChannel.getChannel(channelUrl, function(openChannel, error) {
        if (error) {
            console.error(error);
            return;
        }

        currentChannel = openChannel;

        openChannel.enter(function(response, error) {
            if (error) {
                console.error(error);
                return;
            }

            setMessagesList(currentChannel);
        });
    });
}

/**
 * Send a message to an open channel
 * @param {string} message Message to send
 * @param {callback} addMessageToList Handle the message sent (add message to the list of messages)
 */
export function sendSendBirdMessageToCurrentChannel(message, addMessageToList) {
    currentChannel.sendUserMessage(message, '', '', function(message, error) {
        if (error) {
            console.error(error);
            return;
        }
        addMessageToList(message);
    });
}

/**
 * Adds a handler for any new message received
 * @param {callback} setMessagesList Function to handle the new messages
 */
export function listenForNewMessages(setMessagesList) {
    channelHandler.onMessageReceived = function(channel, message) {
        setMessagesList(message);
    };

    sb.addChannelHandler(currentChannel, channelHandler);
}

/**
 * Get all the previous messages of the current channel
 * @param {callback} setMessagesList Function to load all the previous messages
 * @param {number} limit Number of messages to load
 */
export function loadCurrentChannelPreviousMessages(setMessagesList, limit = 20) {
    let messageListQuery = currentChannel.createPreviousMessageListQuery();
    messageListQuery.limit = limit;
    messageListQuery.reverse = true;

    messageListQuery.load((messageList, error) => {
        if (error) {
            console.error(error);
            return;
        }
        setMessagesList(messageList);
    });
}

/**
 * Returns all the current channel data
 */
export function getOpenChannelData() {
    return currentChannel;
}