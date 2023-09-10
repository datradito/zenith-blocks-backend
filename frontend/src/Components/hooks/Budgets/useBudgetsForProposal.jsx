import { GET_ALL_BUDGETS_FOR_PROPOSAL } from "../../../ServerQueries/Budget/Queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";


export const useAllBudgetsForProposal = (proposalId) => {
    const { loading: budgetsLoading, error: budgetsError, data: budgetList, refetch } = useQuery(GET_ALL_BUDGETS_FOR_PROPOSAL, {
        variables: { proposalid: proposalId },
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        refetch();
    }, [proposalId]);


    return {
        budgetList,
        budgetsLoading,
        budgetsError,
    };
};