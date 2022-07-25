import { ON_PURCHASE_FINISHED } from '../utilities/Constants';

export const setOnPurchaseFinished = (onFinish) => (dispatch) => {
    dispatch(setOnPurchaseFinishedSuccess(onFinish));
}

const setOnPurchaseFinishedSuccess = (payload) => {
    return {
        type: ON_PURCHASE_FINISHED,
        payload
    }
}