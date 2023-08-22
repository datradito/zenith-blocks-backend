import { useMemo, useEffect, useState } from 'react';

// Custom hook for filtering proposal amount by ID
const useFilteredProposalAmount = (proposals, proposalId) => {
    const filteredProposal = useMemo(() => {
        return proposals.filter((proposal) => proposal.id === proposalId ? proposal.amount : null);
    }, [proposals, proposalId]);

    const [filteredAmount, setFilteredAmount] = useState(filteredProposal[0]?.amount);

    useEffect(() => {
        setFilteredAmount(filteredProposal[0]?.amount);
    }, [filteredProposal]);

    return filteredAmount;
};

export default useFilteredProposalAmount;
