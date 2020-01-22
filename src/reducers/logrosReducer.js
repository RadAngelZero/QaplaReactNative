// diego          - 11-12-2019 - us165 - EMPTY_LOGROS case added
// diego          - 04-10-2019 - us113 - File creation

import { LOAD_USER_VERIFICATION_STATUS, LOAD_LOGROS_ACTIVOS, REMOVE_LOGRO_ACTIVO, LOAD_LOGROS_COMPLETOS, EMPTY_LOGROS } from '../utilities/Constants';

const initialState = {
    logrosActivos: {},
    logrosCompletados: {},
    isUserVerified: null,
    fetched: false
};

function logrosReducer(state = initialState, action) {
    const { logrosActivos, logrosCompletados } = state;

    switch (action.type) {
        case LOAD_USER_VERIFICATION_STATUS:

            return { ...state, isUserVerified: action.payload };
        case LOAD_LOGROS_ACTIVOS:
            logrosActivos[action.payload.id] = { ...logrosActivos[action.payload.id], ...action.payload };

            return { ...state, ...logrosActivos, fetched: true };
        case REMOVE_LOGRO_ACTIVO:
            delete logrosActivos[action.payload];

            return { ...state, logrosActivos };
        case LOAD_LOGROS_COMPLETOS:
            if (logrosActivos[action.payload.id]) {
                logrosCompletados[action.payload.id] = { ...logrosActivos[action.payload.id], ...action.payload };
            }

            return { ...state, ...logrosCompletados };
        case EMPTY_LOGROS:

            return { ...state, logrosActivos: {}, logrosCompletados: {}, isUserVerified: null, fetched: false };
        default:
            return state;
    }
};

export default logrosReducer;