//josep maria

import {
    GET_CURRENT_SCREEN_ID,
    SET_CURRENT_SCREEN_ID,
    SET_PREVIOUS_SCREEN_ID,
} from '../utilities/Constants';

// export const getCurrentScreenId = () => async (dispatch) => {
//     dispatch(getCurrentScreenIdSuccess());
// }

// export const getCurrentScreenIdSuccess = (payload) => {
//     return {
//         type: GET_CURRENT_SCREEN_ID,
//         payload
//     };
// }

export const setCurrentScreenId = (value) => async (dispatch) => {
    dispatch(setCurrentScreenIdSuccess(value));
}

export const setCurrentScreenIdSuccess = (payload) => {
    return {
        type: SET_CURRENT_SCREEN_ID,
        payload
    };
}

export const setPreviousScreenId = (value) => async (dispatch) => {
    dispatch(setPreviousScreenIdSuccess(value));
}

export const setPreviousScreenIdSuccess = (payload) => {
    return {
        type: SET_PREVIOUS_SCREEN_ID,
        payload
    };
}