import { SET_PROPOSAL, GET_PROPOSAL, SET_PROPOSAL_BUDGET_LIST } from '../../actions/currentProposal/types';

const initialState = {
    proposal: null,
    loading: false,
    error: null,
    budgets: [],
};

const currentProposalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROPOSAL:
            return {
                ...state,
                proposal: {
                    space: action.payload.space.name,
                    "Total Budget": "182345",
                    id: action.payload.id,
                    ipfs: action.payload.ipfs,
                    title: action.payload.title,
                },
            };
        case SET_PROPOSAL_BUDGET_LIST: 
            return {
                ...state,
                budgets: action.payload,
            }
        case GET_PROPOSAL:
            return {
                ...state.proposal,
                // loading: false,
            };
        default:
            return state;
    }
};

export default currentProposalReducer;