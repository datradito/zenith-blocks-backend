import { SET_PROPOSAL, GET_PROPOSAL } from '../../actions/currentProposal/types';

const initialState = {
    proposal: null,
    loading: false,
    error: null,
};

const currentProposalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROPOSAL:
            return {
                ...state,
                proposal: action.payload,
            };
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