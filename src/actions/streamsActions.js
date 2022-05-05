import {
    eventsDataRef,
    eventParticipantsRef,
    listenStreamCustomRewards,
    getStreamerStreamingStatus,
    getStreamerThumbnailUrl
} from '../services/database';
import {
    HOURS_IN_DAY,
    LOAD_FEATURED_STREAM,
    LOAD_LIVE_STREAM,
    LOAD_STREAMS_BY_DATE_RANGE,
    ONE_HOUR_MILISECONDS,
    REMOVE_FEATURED_STREAM,
    REMOVE_STREAM,
    UPDATE_FEATURED_STREAM,
    UPDATE_STREAM
} from '../utilities/Constants';

const listeningStreams = [];

export const loadFeaturedStreams = (uid) => async (dispatch) => {
    const today = new Date();
    today.setHours(today.getHours() - 3);

    eventsDataRef.orderByChild('featured').equalTo(true).on('child_added', (featuredStream) => {
        const featuredStreamObject = {
            id: featuredStream.key,
            ...featuredStream.val(),
            isUserAParticipant: false
        };

        // Only show upcoming streams (or streams scheduled to start 3 hours ago or less)
        if (featuredStream.val().timestamp >= today.getTime()) {
            dispatch(loadFeaturedStreamSuccess(featuredStreamObject));

            listenStreamCustomRewards(featuredStream.key, (streamRewards) => {
                if (streamRewards.exists()) {
                    async function checkIfStreamerIsStreaming() {
                        const isStreaming = await getStreamerStreamingStatus(streamRewards.val().streamerUid);
                        if (isStreaming) {
                            const streamerThumbnailUrl = await getStreamerThumbnailUrl(streamRewards.val().streamerUid);

                            streamObject = {
                                ...featuredStreamObject,
                                thumbnailUrl: streamerThumbnailUrl.val()
                            }
                            dispatch(removeFeaturedStream(featuredStream.key));
                            dispatch(loadLiveStream(featuredStream.key, streamObject));

                            /**
                             * If the stream is live then remove real time listener for participation (the user
                             * can not join the stream once it has started)
                             */
                            if (uid) {
                                eventParticipantsRef.child(featuredStream.key).child(uid).off('value');
                                const indexToRemove = listeningStreams.indexOf(featuredStream.key);
                                if (indexToRemove >= 0) {
                                    listeningStreams.splice(indexToRemove, 1);
                                }
                            }
                        }
                    }

                    checkIfStreamerIsStreaming();
                }
            });

            if (uid && listeningStreams.indexOf(featuredStream.key) < 0) {
                eventParticipantsRef.child(featuredStream.key).child(uid).on('value', (userParticipant) => {
                    listeningStreams.push(featuredStream.key);
                    if (userParticipant.exists()) {
                        dispatch(updateFeaturedStream(featuredStream.key, { isUserAParticipant: true }));
                    }
                });
            }
        }
    });
}

export const loadStreamsByListIndex = (uid, index) => async (dispatch) => {
    const today = new Date();
    if (index > 0) {
        today.setHours(0, 0, 0, 0);
    } else {
        today.setHours(today.getHours() - 3);
    }

    const startAt = new Date(today.getTime() + ((ONE_HOUR_MILISECONDS * HOURS_IN_DAY) * index));

    const endAt = new Date(startAt.getTime());
    endAt.setHours(23, 59, 59, 999);

    eventsDataRef.orderByChild('timestamp').startAt(startAt.getTime()).endAt(endAt.getTime()).on('child_added', (stream) => {
        if (!stream.val().featured) {
            let streamObject = {
                id: stream.key,
                ...stream.val(),
                isUserAParticipant: false
            };

            dispatch(loadStreamByDateRange(streamObject, index));

            /**
             * If the stream is scheduled for today (index === 0) then listen for custom rewards (as the stream can
             * suddenly start while the user is in the app)
             */
            if (index === 0) {
                listenStreamCustomRewards(stream.key, (streamRewards) => {
                    if (streamRewards.exists()) {
                        async function checkIfStreamerIsStreaming() {
                            const isStreaming = await getStreamerStreamingStatus(streamRewards.val().streamerUid);
                            if (isStreaming) {
                                const streamerThumbnailUrl = await getStreamerThumbnailUrl(streamRewards.val().streamerUid);

                                streamObject = {
                                    ...streamObject,
                                    thumbnailUrl: streamerThumbnailUrl.val()
                                }
                                dispatch(removeStream(stream.key, index));
                                dispatch(loadLiveStream(stream.key, streamObject));

                                /**
                                 * If the stream is live then remove real time listener for participation (the user
                                 * can not join the stream once it has started)
                                 */
                                if (uid) {
                                    eventParticipantsRef.child(stream.key).child(uid).off('value');
                                    const indexToRemove = listeningStreams.indexOf(stream.key);
                                    if (indexToRemove >= 0) {
                                        listeningStreams.splice(indexToRemove, 1);
                                    }
                                }
                            }
                        }

                        checkIfStreamerIsStreaming();
                    }
                });
            }

            if (uid && listeningStreams.indexOf(stream.key) < 0) {
                eventParticipantsRef.child(stream.key).child(uid).on('value', (userParticipant) => {
                    listeningStreams.push(stream.key);
                    if (userParticipant.exists()) {
                        dispatch(updateStream(stream.key, { isUserAParticipant: true }, index));
                    }
                });
            }
        }
    });
}

const loadFeaturedStreamSuccess = (payload) => ({
    type: LOAD_FEATURED_STREAM,
    payload
});

const updateFeaturedStream = (id, payload) => ({
    type: UPDATE_FEATURED_STREAM,
    id,
    payload
});

const removeFeaturedStream = (id) => ({
    type: REMOVE_FEATURED_STREAM,
    id
});

const loadStreamByDateRange = (payload, index) => ({
    type: LOAD_STREAMS_BY_DATE_RANGE,
    payload,
    index
});

const updateStream = (id, payload, index) => ({
    type: UPDATE_STREAM,
    id,
    payload,
    index
});

const removeStream = (id, index) => ({
    type: REMOVE_STREAM,
    id,
    index
});

const loadLiveStream = (id, payload) => ({
    type: LOAD_LIVE_STREAM,
    id,
    payload
});