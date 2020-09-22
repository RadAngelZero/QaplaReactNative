import { SET_ENABLE_SCROLL } from '../utilities/Constants';

export const setScroll = (enableScroll) => (dispatch) => {
    dispatch(setScrollSuccess(enableScroll));
}

const setScrollSuccess = (enableScroll) => {
    return {
        type: SET_ENABLE_SCROLL,
        payload: enableScroll
    }
}