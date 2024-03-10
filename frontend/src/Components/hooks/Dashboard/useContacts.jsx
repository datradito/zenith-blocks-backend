import { useTransactionHistory } from './useTransactionHistory';

const useContacts = () => { 
    const { transactions } = useTransactionHistory();

    //TODO: Transactions.to is contact. Let's make a service which takes safeSelected, userAddress, daoId and fetches info from database
    //TODO: then it merges both transactions.to and result from api, removes duplicates.
}

export default useContacts