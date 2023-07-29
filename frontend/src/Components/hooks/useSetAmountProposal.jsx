import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_OR_UPDATE_PROPOSAL } from '../../ServerQueries/proposalMutation'; // Import the ADD_OR_UPDATE_PROPOSAL mutation

const useSaveProposalDetails = () => {
    // const [proposalAmount, setProposalAmount] = useState(null);
    let proposalId;
    const [SetProposalAmount, { data, loading, error }] = useMutation(ADD_OR_UPDATE_PROPOSAL);

    const saveProposalDetails = async (formData) => {

        try {
            const { data } = await SetProposalAmount({
                variables: {
                    id: formData.id,
                    amount: parseInt(formData.amount),
                    modifier: '0x9f74662aD05840Ba35d111930501c617920dD68e',
                    rootpath: formData.space.id,
                    daoid: formData.space.id,
                },
            });

            //we can use proposalId from here to update currentProposalAmount state upon success from backend
            // proposalId= formData.id;
            // console.log(formData.id)
            // const { amount } = data.setProposalAmount;
            // setProposalAmount(amount);
        } catch (error) {
            // Handle any errors from the mutation
            console.error(error);
        }
    };

    return {
        // proposalAmount,
        loading,
        error,
        // proposalId,
        saveProposalDetails,
    };
};

export default useSaveProposalDetails;
