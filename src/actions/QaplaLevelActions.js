import { getQaplaLevels } from '../services/database';
import { GET_QAPLA_LEVELS } from '../utilities/Constants';

export const getLevels = () => async (dispatch) => {
    const levels = await getQaplaLevels();

    if (levels.exists()) {
        dispatch(getLevelsSuccess(levels.val()));
    }
}

export const getLevelsSuccess = (payload) => {
    return {
        type: GET_QAPLA_LEVELS,
        payload
    }
}