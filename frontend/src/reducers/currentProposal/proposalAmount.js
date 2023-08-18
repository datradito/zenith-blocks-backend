import { ADD_AMOUNT } from "../../actions/currentProposal/amountTypes";

const initialState = {
    proposals: []
};


const proposalAmountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_AMOUNT:
            const existingProposalIndex = state.proposals.findIndex(
                (proposal) => proposal.id === action.payload.proposalId
            );
            if (existingProposalIndex !== -1) {
                // Proposal exists, replace the amount
                return {
                    ...state,
                    proposals: state.proposals.map((proposal, index) =>
                        index === existingProposalIndex
                            ? { ...proposal, amount: action.payload.amount, status: action.payload.status }
                            : proposal
                    ),
                };
            } else {
                return {
                    ...state,
                    proposals: [
                        ...state.proposals,
                        {
                            id: action.payload.proposalId,
                            amount: action.payload.amount,
                            status: action.payload.status
                        },
                    ],
                };
            }
        default:
            return state;
    }
};

export default proposalAmountReducer;