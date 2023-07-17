import { ADD_ROW, DELETE_ROW, GET_ALL_ROWS,  UPDATE_FIELD, SET_INITIAL_STATE, REFRESH_STATE } from "./types";

export const setInitialState = (data) => ({
    type: SET_INITIAL_STATE,
    payload: data
});

export const refreshState = () => ({
    type: REFRESH_STATE,
});

export const addRow = (row) => ({   
    type: ADD_ROW,
    payload: row,
});

export const deleteRow = (index) => ({  
    type: DELETE_ROW,
    payload: index,
});

export const updateField = (index, field, value) => ({
    type: UPDATE_FIELD,
    payload: { index, field, value },
});

export const getAllRows = () => ({
    type: GET_ALL_ROWS,
});