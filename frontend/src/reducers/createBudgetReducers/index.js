import { UPDATE_FIELD, ADD_ROW, DELETE_ROW, GET_ALL_ROWS, SET_INITIAL_STATE, REFRESH_STATE } from "../../actions/createBudgetAction/types";
import generateUUID from "../../Utility/uniqueId";


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
                items: [
                    {
                        ...state.items[0],
                        id: action.payload.id, // Add the id field to the first item
                    },],
                proposal:
                {
                    "Goverance": action.payload.proposal.space.name,
                    "Total Budget": "182345",
                    "Proposal": action.payload.proposal.id,
                    "Ipfs Link": action.payload.proposal.ipfs,
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
                    idx === index ? {
                        ...item,
                        [field]: value,
                        Breakdown: field === 'Allocated Budget' ? `${(parseInt(value) / 500) * 100}%` : item.Breakdown,
                    } : item
                )
            };
        case REFRESH_STATE:
            return {
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
        case GET_ALL_ROWS:
            return state; 
        default:
            return state;
    }
}


export default createBudgetReducer;

