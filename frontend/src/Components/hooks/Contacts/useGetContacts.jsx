import { useQuery } from "@apollo/client";

import { GET_ALL_CONTACTS } from "../../../ServerQueries/Contacts/Queries.js";

import { useTransactionHistory } from "../Transactions/useTransactionHistory";
import { useAccountAbstraction } from "../../Utility/Providers/AccountAbstractionContext";
export const useGetContacts = (filter = {}, prevTransacted) => {
  const { safeSelected, apiKit } = useAccountAbstraction();

  const { transactions, loading: pervTransactedLoading } =
    useTransactionHistory(safeSelected, apiKit, "All");


    const sanitizePrevTransacted = async () => {
       return transactions.filter(
        (transaction, index, self) =>
          index === self.findIndex((t) => t.to === transaction.to)
      );
    };

    const mergeUniqueContacts = (contacts, prevTransacted) => {
        return contacts.filter(
            (contact) =>
            !prevTransacted.find((prev) => prev.to === contact.address)
        );
    };
    
    
  const { loading, error, data, refetch } = useQuery(GET_ALL_CONTACTS, {
    variables: { filter },
    errorPolicy: "all",
    onCompleted: async (data) => {
        const safeContacts = await sanitizePrevTransacted();
        return mergeUniqueContacts(data?.getContacts, safeContacts);
        // mergeUniqueContacts is a custom function that merges and returns unique contacts from data and safeContacts
        // You need to implement this function according to your requirements
    },
    onError: (error) => {
      console.log(error);
    },
  });
    
    console.log(data)

  return {
    loading,
    error,
    contacts: data?.getContacts,
    refetchContacts: refetch,
  };
};
export default useGetContacts;
