import { UPDATE_FIELD, ADD_ROW, DELETE_ROW, GET_ALL_ROWS } from "../../actions/createBudgetAction/types";

const initialState = {
    items: [
    {
        action: '-',
        category: '',
        currency: '',
        percentage: '',
        breakdown: ''
    }
]};

const createBudgetReducer =(state = initialState, action) => {
    switch (action.type) {
        case ADD_ROW:{
                state.items.push(action.payload)
            };
        case DELETE_ROW:
            return {
                ...state,
                items: state.items.filter((_, index) => index !== action.payload)
            };
        case UPDATE_FIELD:
            const { index, field, value } = action.payload;
            return {
                ...state,
                items: state.items.map((item, idx) =>
                    idx === index ? { ...item, [field]: value } : item
                )
            };
        case GET_ALL_ROWS:
            return state; // No changes needed here, just return the current state
        default:
            return state;
    }
}


export default createBudgetReducer;
