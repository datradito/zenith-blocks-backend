import { SET_BUDGET, GET_BUDGET } from './types';

export const setBudget = (payload) => ({
    type: SET_BUDGET,
    payload: payload,
});

export const getBudget = () => ({
    type: GET_BUDGET,
});