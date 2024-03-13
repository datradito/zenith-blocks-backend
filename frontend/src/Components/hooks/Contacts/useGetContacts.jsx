import { useQuery } from "@apollo/client";
import { useState } from "react";

import { GET_ALL_CONTACTS } from "../../../model/contacts/query";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";

export const useGetContacts = (filter = {}, prevTransacted) => {
  const [contacts, setContacts] = useState([]);

  const { transactions } = useDashboardStore((state) => state);
  const sanitizePrevTransacted = async () => {
    return transactions.filter(
      (transaction, index, self) =>
        index === self.findIndex((t) => t.to === transaction.to)
    );
  };

  const mergeUniqueContacts = (contacts, prevTransacted) => {
    return contacts.filter(
      (contact) => !prevTransacted.find((prev) => prev.to === contact.address)
    );
  };

  const { loading, error, refetch } = useQuery(GET_ALL_CONTACTS, {
    variables: { filter },
    errorPolicy: "all",
    onCompleted: async (data) => {
      const safeContacts = await sanitizePrevTransacted();
      const uniqueContacts = mergeUniqueContacts(
        data.getContacts,
        safeContacts
      );
      setContacts(uniqueContacts);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  console.log(contacts);

  return {
    loading,
    error,
    contacts,
    refetchContacts: refetch,
  };
};
export default useGetContacts;
