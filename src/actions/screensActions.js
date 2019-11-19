// josep.sanahuja - 26-08-2019 - us147 - File creation

import {
    SET_CURRENT_SCREEN_ID,
    SET_PREVIOUS_SCREEN_ID,
} from '../utilities/Constants';

export const setCurrentScreenId = (value) => (dispatch) => {
    dispatch(setCurrentScreenIdSuccess(value));
}

export const setCurrentScreenIdSuccess = (payload) => {
    return {
        type: SET_CURRENT_SCREEN_ID,
        payload
    };
}

export const setPreviousScreenId = (value) => (dispatch) => {
    dispatch(setPreviousScreenIdSuccess(value));
}

export const setPreviousScreenIdSuccess = (payload) => {
    return {
        type: SET_PREVIOUS_SCREEN_ID,
        payload
    };
}