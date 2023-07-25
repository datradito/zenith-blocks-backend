import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_OR_UPDATE_PROPOSAL } from '../../ServerQueries/proposalMutation'; // Import the ADD_OR_UPDATE_PROPOSAL mutation

const useSaveProposalDetails = () => {
    const [proposalAmount, setProposalAmount] = useState(null);
    let proposalId;
    const [addOrUpdateProposal, { data, loading, error }] = useMutation(ADD_OR_UPDATE_PROPOSAL);

    const saveProposalDetails = async (formData) => {
        try {
            const { data } = await addOrUpdateProposal({
                variables: {
                    Id: formData.id,
                    Amount: parseInt(formData.amount),
                    Modifier: '0x9f74662aD05840Ba35d111930501c617920dD68e',
                    RootPath: formData.space.id,
                    DaoId: formData.space.id,
                },
            });
            proposalId= formData.id;
            // Do something with the data, if needed
            const { amount } = data.addOrUpdateProposal;
            setProposalAmount(amount);
        } catch (error) {
            // Handle any errors from the mutation
            console.error(error);
        }
    };

    return {
        proposalAmount,
        loading,
        error,
        proposalId,
        saveProposalDetails,
    };
};

export default useSaveProposalDetails;
