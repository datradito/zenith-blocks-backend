import { ADD_AMOUNT } from "./amountTypes";

export const addAmount = ({ amount, proposalId }) => (
    {
    type: ADD_AMOUNT,
    payload: {
        amount,
        proposalId,
    },
});
