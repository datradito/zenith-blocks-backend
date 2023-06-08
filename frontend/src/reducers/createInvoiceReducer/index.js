import { UPDATE_FIELD_INVOICE, ADD_ROW_INVOICE, DELETE_ROW_INVOICE, GET_ALL_ROWS_INVOICE } from "../../actions/createInvoiceAction/types";

const initialState = {
        header:
            {

            },
        lines: [
            {
                action: '-',
                Category: '',
                Notes: '',
                Price: '',
                Quantity: '',
                Total: ''
            }
        ]
};

const createBudgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ROW_INVOICE: {
                state.lines.push(action.payload)
        }
        case DELETE_ROW_INVOICE:
            return {
                ...state,
                lines: state.lines.filter((_, index) => index !== action.payload)
            };
        case UPDATE_FIELD_INVOICE:
            const { index, field, value } = action.payload;
            return {
                ...state,
                lines: state.lines.map((item, idx) =>
                    idx === index ? { ...item, [field]: value } : item
                )
            };
        case GET_ALL_ROWS_INVOICE:
            return state; // No changes needed here, just return the current state
        default:
            return state;
    }
}


export default createBudgetReducer;

