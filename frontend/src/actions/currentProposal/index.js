import { SET_PROPOSAL, GET_PROPOSAL } from './types';

export const setProposal = (proposal) => ({
    type: SET_PROPOSAL,
    payload: proposal,
});

export const getProposal = () => ({
    type: GET_PROPOSAL,
});