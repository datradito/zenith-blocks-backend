import { ADD_ROW, DELETE_ROW, UPDATE_FIELD, SET_INITIAL_STATE } from "./types";

export const setInitialState = (proposal) => ({
    type: SET_INTIAL_STATE,
    payload: proposal
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