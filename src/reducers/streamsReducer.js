import { ADD_STREAM_TO_USER_STREAMS, LOAD_FEATURED_STREAM, LOAD_STREAMS_BY_DATE_RANGE, UPDATE_FEATURED_STREAM, UPDATE_STREAM } from '../utilities/Constants';

const initialState = {
    streamsLists: {
        featured: {},
        streams: [{}, {}, {}, {}, {}, {}, {}]
    },
    userStreams: [],
    fetched: false
};

function streamsReducer(state = initialState, action) {
    const { streamsLists, userStreams } = state;
    const { featured, streams } = streamsLists

    switch (action.type) {
        case LOAD_FEATURED_STREAM:
            featured[action.payload.id] = { ...featured[action.payload.id], ...action.payload };

            return { ...state, streamsLists: { ...streamsLists, featured }, fetched: true };
        case UPDATE_FEATURED_STREAM:
            Object.keys(action.payload).forEach((keyToUpdate) => {
                featured[action.id][keyToUpdate] = action.payload[keyToUpdate];
            });

            return { ...state, streamsLists: { ...streamsLists, featured }, fetched: true };
        case ADD_STREAM_TO_USER_STREAMS:
            if (userStreams.indexOf(action.payload.id) < 0) {
                userStreams.push(action.payload.id);
            }

            return { ...state, ...userStreams, fetched: true };
        case LOAD_STREAMS_BY_DATE_RANGE:
            streams[action.index][action.payload.id] = { ...streams[action.index][action.payload.id], ...action.payload };

            return { ...state, streamsLists: { ...streamsLists, streams }, fetched: true };
        case UPDATE_STREAM:
            Object.keys(action.payload).forEach((keyToUpdate) => {
                streams[action.index][action.id][keyToUpdate] = action.payload[keyToUpdate];
            });

        return { ...state, streamsLists: { ...streamsLists, streams }, fetched: true };
        default:
            return state;
    }
};

export default streamsReducer;