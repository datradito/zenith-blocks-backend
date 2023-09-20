import { IS_LOGGED, IS_NOT_LOGGED } from "../../actions/createAuthAction/types";

const initialState = {
    isLoggedIn: false,
};

const createAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOGGED:
            return {
                ...state,
                isLoggedIn: action.payload
            };
        case IS_NOT_LOGGED:
            return {
                ...state,
                isLoggedIn: false
            };
        default:
            return state;
    }
}

export default createAuthReducer;