// diego          - 11-12-2019 - us165 - EMPTY_LOGROS case added
// diego          - 04-10-2019 - us113 - File creation

import { LOAD_LOGROS_ACTIVOS, REMOVE_LOGRO_ACTIVO, EMPTY_LOGROS } from '../utilities/Constants';

const initialState = {
    logrosActivos: {},
    logrosCompletados: {},
    isUserVerified: null,
    fetched: false
};

function logrosReducer(state = initialState, action) {
    const { logrosActivos, logrosCompletados } = state;

    switch (action.type) {
        case LOAD_LOGROS_ACTIVOS:
            logrosActivos[action.payload.id] = { ...logrosActivos[action.payload.id], ...action.payload };

            return { ...state, ...logrosActivos, fetched: true };
        case REMOVE_LOGRO_ACTIVO:
            delete logrosActivos[action.payload];

            return { ...state, logrosActivos };
        case EMPTY_LOGROS:

            return { ...state, logrosActivos: {}, logrosCompletados: {}, isUserVerified: null, fetched: false };
        default:
            return state;
    }
};

export default logrosReducer;