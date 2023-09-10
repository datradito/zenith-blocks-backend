import { ADD_AMOUNT } from "./amountTypes";

export const addAmount = ({ amount, proposalId, status }) => (
    {
    type: ADD_AMOUNT,
    payload: {
        amount,
        proposalId,
        status
    },
});
