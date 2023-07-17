import { SET_BUDGET, GET_BUDGET } from '../../actions/currentBudgetAction/types';

const initialState = {
    Budget: null,
};

const currentBudgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUDGET:
            console.log(action.payload);
            return {
                Budget: {
                    id: action.payload,
                }
            };
        case GET_BUDGET:
            return {
                ...state.Budget,
            };
        default:
            return state;
    }
};

export default currentBudgetReducer;