import { SET_PROPOSAL, GET_PROPOSAL, SET_PROPOSAL_BUDGET_LIST } from './types';

export const setProposal = (proposal) => ({
    type: SET_PROPOSAL,
    payload: proposal,
});

export const getProposal = () => ({
    type: GET_PROPOSAL,
});

export const setProposalBudgetList = (budgets) => ({
    type: SET_PROPOSAL_BUDGET_LIST,
    payload: budgets,
});
