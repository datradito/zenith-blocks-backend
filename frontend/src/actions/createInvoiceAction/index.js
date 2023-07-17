import { ADD_ROW_INVOICE, DELETE_ROW_INVOICE, UPDATE_FIELD_INVOICE, GET_ALL_ROWS_INVOICE, UPDATE_INVOICE_HEADER} from "./types";


export const updateHeader = (field, value) => ({
    type: UPDATE_INVOICE_HEADER,
    payload: { field, value },
});

export const addRow = (row) => ({
    type: ADD_ROW_INVOICE,
    payload: row,
});

export const deleteRow = (index) => ({
    type: DELETE_ROW_INVOICE,
    payload: index,
});

export const updateField = (index, field, value) => ({
    type: UPDATE_FIELD_INVOICE,
    payload: { index, field, value },
});

export const getAllRows = () => ({
    type: GET_ALL_ROWS_INVOICE,
});