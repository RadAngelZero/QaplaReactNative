import { eventsDataRef, eventParticipantsRef, removeActiveEventUserSubscribedListener } from '../services/database';
import { ADD_STREAM_TO_USER_STREAMS, HOURS_IN_DAY, LOAD_FEATURED_STREAM, LOAD_STREAMS_BY_DATE_RANGE, ONE_HOUR_MILISECONDS } from '../utilities/Constants';

const listeningStreams = [];

export const loadFeaturedStreams = (uid) => async (dispatch) => {
    const date = new Date();
    date.setHours(date.getHours() - 2);

    eventsDataRef.orderByChild('featured').equalTo(true).on('child_added', (featuredStream) => {
        const featuredStreamObject = {
            id: featuredStream.key,
            ...featuredStream.val()
        };

        dispatch(loadFeaturedStreamSuccess(featuredStreamObject));

        if (uid && listeningStreams.indexOf(featuredStream.key) < 0) {
            eventParticipantsRef.child(featuredStream.key).child(uid).on('value', (userParticipant) => {
                listeningStreams.push(featuredStream.key);
                if (userParticipant.exists()) {
                    dispatch(addStreamToUserStreams({ id: featuredStream.key }));
                }
            });
        }
    });
}

export const loadStreamsByListIndex = (uid, index) => async (dispatch) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startAt = new Date(today.getTime() + ((ONE_HOUR_MILISECONDS * HOURS_IN_DAY) * index));

    const endAt = new Date(startAt.getTime());
    endAt.setHours(23, 59, 59, 999);

    eventsDataRef.orderByChild('timestamp').startAt(startAt.getTime()).endAt(endAt.getTime()).on('child_added', (stream) => {
        const streamObject = {
            id: stream.key,
            ...stream.val()
        };

        dispatch(loadStreamByDateRange(streamObject, index));

        if (uid && listeningStreams.indexOf(stream.key) < 0) {
            eventParticipantsRef.child(stream.key).child(uid).on('value', (userParticipant) => {
                listeningStreams.push(stream.key);
                if (userParticipant.exists()) {
                    dispatch(addStreamToUserStreams({ id: stream.key }));
                }
            });
        }
    });
}

const loadFeaturedStreamSuccess = (payload) => ({
    type: LOAD_FEATURED_STREAM,
    payload
});

const addStreamToUserStreams = (payload) => ({
    type: ADD_STREAM_TO_USER_STREAMS,
    payload
});

const loadStreamByDateRange = (payload, index) => ({
    type: LOAD_STREAMS_BY_DATE_RANGE,
    payload,
    index
});