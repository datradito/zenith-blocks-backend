import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
export default ( {hashProp}) => {
    const addRecentTransaction = useAddRecentTransaction();
    return (
        <button
            onClick={() => {
                addRecentTransaction({
                    hash: hashProp,
                    description: 'Transaction',
                });
            }}
        >
            Add recent transaction
        </button>
    );
};