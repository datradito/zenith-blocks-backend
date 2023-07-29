import { ADD_AMOUNT } from "../../actions/currentProposal/amountTypes";

const initialState = {
    proposals: [
        {
        }
    ]
};


const proposalAmountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_AMOUNT:
            const existingProposalIndex = state.proposals.findIndex(
                (proposal) => proposal.id === action.payload.proposalId
            );
                console.log("state.proposals")
            if (existingProposalIndex !== -1) {
                // Proposal exists, replace the amount
                return {
                    ...state,
                    proposals: state.proposals.map((proposal, index) =>
                        index === existingProposalIndex
                            ? { ...proposal, amount: action.payload.amount }
                            : proposal
                    ),
                };
            } else {
                console.log("from reducer")
                // Proposal doesn't exist, push a new object
                return {
                    ...state,
                    proposals: [
                        ...state.proposals,
                        {
                            id: action.payload.proposalId,
                            amount: action.payload.amount,
                        },
                    ],
                };
            }
        default:
            return state;
    }
};

export default proposalAmountReducer;