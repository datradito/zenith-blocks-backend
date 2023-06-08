import { ADD_ROW_INVOICE, DELETE_ROW_INVOICE, UPDATE_FIELD_INVOICE, GEL_ALL_ROWS_INVOICE} from "./types";


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
    type: GEL_ALL_ROWS_INVOICE,
});