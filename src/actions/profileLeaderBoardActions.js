import { SET_ENABLE_SCROLL, SET_USER_IMAGE } from '../utilities/Constants';

export const setScroll = (enableScroll) => (dispatch) => {
    dispatch(setScrollSuccess(enableScroll));
}

export const setUserImage = (userImage) => (dispatch) => {
    dispatch(setImageSuccess(userImage));
}

const setScrollSuccess = (enableScroll) => {
    return {
        type: SET_ENABLE_SCROLL,
        payload: enableScroll
    }
}

const setImageSuccess = (userImage) => {
    return {
        type: SET_USER_IMAGE,
        payload: userImage
    }
}