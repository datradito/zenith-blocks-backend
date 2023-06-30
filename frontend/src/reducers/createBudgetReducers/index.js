import { UPDATE_FIELD, ADD_ROW, DELETE_ROW, GET_ALL_ROWS, SET_INITIAL_STATE } from "../../actions/createBudgetAction/types";



// const storedState = JSON.parse(localStorage.getItem('persist:root'));

const initialState = {
    items: [
        {
            action: '-',
            Categories: '',
            "Allocated Budget": '',
            Currency: '',
            Breakdown: '',
            Remaining: '',
        }
    ],
    proposal: {}
};

const createBudgetReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_INITIAL_STATE: {
            return {
                ...state,
                proposal:
                {
                    "Goverance": action.payload.governance,
                    "Total Budget": "182345",
                    "Proposal": action.payload.proposal,
                    "Ipfs Link": action.payload.ipfsLink,
                },
            };
        };
        case ADD_ROW: {
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
                                    // idx === index ? { ...item, [field]: field === "Allocated Budget" ? (50000 - value) : value } : item
                )
            };
        case GET_ALL_ROWS:
            return state; // No changes needed here, just return the current state
        default:
            return state;
    }
}


export default createBudgetReducer;

