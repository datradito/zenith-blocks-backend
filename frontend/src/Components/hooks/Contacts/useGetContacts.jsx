import { useQuery } from "@apollo/client";
import { useState } from "react";

import { GET_ALL_CONTACTS } from "../../../model/contacts/query";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";

export const useGetContacts = (filter = {}, prevTransacted) => {
  const [contacts, setContacts] = useState([]);

  const { transactions } = useDashboardStore((state) => state);
  //get all the contacts from dashboard store
  //run a query to back end with all addresses
  //return a final list of contacts with {{ address: xyz, name: xyz }]

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
        console.log(data.getContacts)

      const uniqueContacts = mergeUniqueContacts(data.getContacts, safeContacts);
      setContacts(uniqueContacts);
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
    contacts,
    refetchContacts: refetch,
  };
};
export default useGetContacts;
