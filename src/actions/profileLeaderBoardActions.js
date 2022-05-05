import { SET_USER_IMAGE } from '../utilities/Constants';

export const setUserImage = (userImage) => (dispatch) => {
    dispatch(setImageSuccess(userImage));
}

const setImageSuccess = (userImage) => {
    return {
        type: SET_USER_IMAGE,
        payload: userImage
    }
}