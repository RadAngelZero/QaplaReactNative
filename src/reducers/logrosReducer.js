import { LOAD_USER_VERIFICATION_STATUS, LOAD_LOGROS_ACTIVOS, REMOVE_LOGRO_ACTIVO, LOAD_LOGROS_COMPLETOS } from '../utilities/Constants';

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
            logrosCompletados[action.payload.id] = {...logrosActivos[action.payload.id], ...action.payload};

            return { ...state, ...logrosCompletados };
        default:
            return state;
    }
};

export default logrosReducer;