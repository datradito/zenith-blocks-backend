import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import { GET_ALL_CONTACTS } from "../../../model/contacts/query";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";
import { message } from "antd";
import { on } from "events";

const transformTransactionsToContacts = async (transactions) => {
  const transactionContact = [];
  const uniqueContacts = transactions.filter(
    (transaction, index, self) =>
      index === self.findIndex((t) => t.to === transaction.to)
  );

  uniqueContacts.forEach((contact) => {
    transactionContact.push({ name: "Unnamed", address: contact.to });
  });

  return transactionContact;
};

const mergeUniqueContacts = (contacts, prevTransacted) => {
  const mergedContacts = [...contacts, ...prevTransacted];
  return mergedContacts.filter(
    (contact, index, self) =>
      index === self.findIndex((t) => t.address === contact.address)
  );
};

export const useGetContacts = (filter = {}) => {
  const { transactions, setContacts, onChangeLoading } = useDashboardStore(
    (state) => state
  );
  const { data, refetch: loadContacts } = useQuery(GET_ALL_CONTACTS, {
    variables: { filter },
    errorPolicy: "all",
  });

  useEffect(() => {
    async function fetchData() {
      if (data) {
        onChangeLoading(true);
        const safeContacts = await transformTransactionsToContacts(
          transactions
        );
        const uniqueContacts = mergeUniqueContacts(
          data.getContacts,
          safeContacts
        );
        setContacts(uniqueContacts);
        onChangeLoading(false);
      }
    }
    fetchData();
  }, [data, transactions]);

  return {
    loadContacts,
  };
};

export default useGetContacts;
