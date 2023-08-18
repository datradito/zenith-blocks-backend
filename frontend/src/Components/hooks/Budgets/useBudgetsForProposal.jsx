// import { GET_ALL_BUDGETS_FOR_PROPOSAL } from "../../../ServerQueries/Budget/Queries";
// import { useCallback, useMemo } from "react";

// import { useQuery } from "@apollo/client";
// import { useSelector } from "react-redux";

// export const useAllBudgetsForProposal = (proposalId) => {
//     const { loading, error, data } = useQuery(GET_ALL_BUDGETS_FOR_PROPOSAL, {
//         variables: { proposalid: proposalId },
//     });
    
    
//     const getAllBudgetsForProposal = useCallback(
//         async (proposalId) => {
//         console.log("Fetching all budgets for proposal:", proposalId);
    
//         try {
//             const { data } = await getAllBudgetsForProposal({
//             variables: { proposalid: proposalId },
//             });
    
//             // Handle the data returned after successful query
//             console.log("All budgets for proposal fetched successfully!", data);
    
//             // Return any other necessary data from the query response
//             return data;
//         } catch (error) {
//             // Handle error if the query fails
//             console.error(
//             "Fetching all budgets for proposal failed:",
//             error.message
//             );
//             throw error;
//         }
//         },
//         [getAllBudgetsForProposal]
//     );
    
//     // Cache the getAllBudgetsForProposal function using useMemo to avoid recreating it on each render
//     const cachedGetAllBudgetsForProposal = useMemo(
//         () => getAllBudgetsForProposal,
//         [getAllBudgetsForProposal]
//     );
    
//     return {
//         getAllBudgetsForProposal: cachedGetAllBudgetsForProposal,
//         loading,
//         error,
//     };
// };

import { GET_ALL_BUDGETS_FOR_PROPOSAL } from "../../../ServerQueries/Budget/Queries";
import { useQuery } from "@apollo/client";


export const useAllBudgetsForProposal = (proposalId) => {
    const { loading: budgetsLoading, error: budgetsError, data: budgetList } = useQuery(GET_ALL_BUDGETS_FOR_PROPOSAL, {
        variables: { proposalid: proposalId },
    });


    return {
        budgetList,
        budgetsLoading,
        budgetsError,
    };
};