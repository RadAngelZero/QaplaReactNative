import {
    CLEAN_ALL_STREAMS,
    LOAD_FEATURED_STREAM,
    LOAD_LIVE_STREAM,
    LOAD_STREAMS_BY_DATE_RANGE,
    REMOVE_FEATURED_STREAM,
    REMOVE_STREAM,
    UPDATE_FEATURED_STREAM,
    UPDATE_STREAM
} from '../utilities/Constants';

const initialState = {
    streamsLists: {
        featured: {},
        streams: [{}, {}, {}, {}, {}, {}, {}],
        live: {}
    }
};

function streamsReducer(state = initialState, action) {
    const { streamsLists } = state;
    const { featured, streams, live } = streamsLists

    switch (action.type) {
        case LOAD_FEATURED_STREAM:
            featured[action.payload.id] = { ...featured[action.payload.id], ...action.payload };

            return { ...state, streamsLists: { ...streamsLists, featured } };
        case UPDATE_FEATURED_STREAM:
            Object.keys(action.payload).forEach((keyToUpdate) => {
                featured[action.id][keyToUpdate] = action.payload[keyToUpdate];
            });

            return { ...state, streamsLists: { ...streamsLists, featured } };
        case REMOVE_FEATURED_STREAM:
            delete featured[action.id]

            return { ...state, streamsLists: { ...streamsLists, featured } };
        case LOAD_STREAMS_BY_DATE_RANGE:
            streams[action.index][action.payload.id] = { ...streams[action.index][action.payload.id], ...action.payload };

            return { ...state, streamsLists: { ...streamsLists, streams } };
        case UPDATE_STREAM:
            Object.keys(action.payload).forEach((keyToUpdate) => {
                streams[action.index][action.id][keyToUpdate] = action.payload[keyToUpdate];
            });

        return { ...state, streamsLists: { ...streamsLists, streams } };
        case REMOVE_STREAM:
            delete streams[action.index][action.id];

            return { ...state, streamsLists: { ...streamsLists, streams } };
        case LOAD_LIVE_STREAM:
            live[action.payload.id] = { ...live[action.payload.id], ...action.payload };

            return { ...state, streamsLists: { ...streamsLists, live } };
        case CLEAN_ALL_STREAMS:
            return { ...state, streamsLists: initialState.streamsLists };
        default:
            return state;
    }
};

export default streamsReducer;