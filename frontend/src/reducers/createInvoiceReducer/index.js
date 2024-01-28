import { UPDATE_FIELD_INVOICE, DELETE_ROW_INVOICE, GET_ALL_ROWS_INVOICE, UPDATE_INVOICE_HEADER, RESET_INVOICE } from "../../actions/createInvoiceAction/types";

const initialState = {
        header:
            {

            },
};

const createBudgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_INVOICE_HEADER:
            return {
                ...state,
                header: {
                    ...state.header,
                    [action.payload.field]: action.payload.value
                }
            };
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
        case RESET_INVOICE:
            return initialState;
        default:
            return state;
    }
}


export default createBudgetReducer;

