// src/hooks/useBudgets.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import transformItems from '../../Utility/transformItems';
import web3 from './web3IPFS';

export default function useBudgets(contract, proposalId) {
    const [budgetList, setBudgetList] = useState(null);
    const [budgetHashes, setBudgetHashes] = useState([]);
    const [budgetsLoading, setBudgetsLoading] = useState(true);

    const fetchBudgetDataForCurrentProposal = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch budget data');
        }
    };

    const fetchAndTransformBudgets = async (budgetHashes) => {
        const transformedItems = [];

        for (const budgetHash of budgetHashes) {
            try {
                const data = await fetchBudgetDataForCurrentProposal(budgetHash);
                const transformedItem = transformItems(data, 500);
                transformedItems.push(transformedItem);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        return transformedItems;
    };

    useEffect(() => {
        const initialize = async () => {
            if (budgetHashes.length === 0 && contract) {
                try {
                    setBudgetsLoading(true);
                    await refreshBudgetList(contract);
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setBudgetsLoading(false);
                }
            }
        };

        initialize();
    }, [contract]);

    const refreshBudgetList = async (contract) => {
        try {
            const decryptedProposalId = web3.utils.keccak256(web3.utils.fromAscii(proposalId));
            const result = await contract.methods.getCidsFromProposal(decryptedProposalId).call();
            setBudgetHashes(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (budgetHashes.length > 0) {
                setBudgetsLoading(true);
                const data = await fetchAndTransformBudgets(budgetHashes);
                setBudgetList(data);
                setBudgetsLoading(false);
            }
        };

        fetchData();
    }, [budgetHashes]);

    return { budgetList, budgetsLoading };
}
