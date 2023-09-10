import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { ADD_OR_UPDATE_PROPOSAL } from '../../../ServerQueries/proposalMutation'; // Import the ADD_OR_UPDATE_PROPOSAL mutation

const useSaveProposalDetails = () => {
    const [SetProposalAmount, { data, loading, error }] = useMutation(ADD_OR_UPDATE_PROPOSAL);

    const saveProposalDetails = async (formData) => {
        try {
            await SetProposalAmount({
                variables: {
                    proposalAmountInput: {
                        id: formData.id,
                        amount: parseInt(formData.amount),
                        modifier: '0x9f74662aD05840Ba35d111930501c617920dD68e',
                        rootpath: formData.space.id,
                        daoid: formData.space.id,
                    }
                },
            });
        } catch (error) {
            toast.error(`Failed to Save Proposal Amount: ${error.message}`);
        }
    };

    return {
        loading,
        error,
        saveProposalDetails,
    };
};

export default useSaveProposalDetails;
