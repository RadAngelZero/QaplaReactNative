import { ON_PURCHASE_FINISHED } from '../utilities/Constants';

const initialState = {
    onPurchaseFinished: () => {}
};

function purchasesReducer(state = initialState, action) {
      let onPurchaseFinished = { ...state.onPurchaseFinished };
      switch (action.type) {
        case ON_PURCHASE_FINISHED:
            onPurchaseFinished = action.payload;
            return { ...state, onPurchaseFinished };
        default:
            return state;
      }
};

export default purchasesReducer;