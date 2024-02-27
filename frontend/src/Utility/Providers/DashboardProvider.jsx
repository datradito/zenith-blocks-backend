import React, {useCallback, useState} from "react";
import { useAccount, useEnsAvatar } from "wagmi";
import { normalize } from "viem/ens";
import { useGetTokens } from "../../Components/hooks/Dashboard/useGetTokens";
import useTransactionHistory from "../../Components/hooks/Dashboard/useTransactionHistory";
import { UserContext } from "./UserProvider";
import { formatUnits } from "viem"; 
import { useSuspenseQuery } from "@tanstack/react-query";
import { useConfig } from "wagmi";
import { getBalanceQueryOptions } from "wagmi/query"; 

import { useAccountAbstraction } from "./AccountAbstractionContext";

export const DashboardContext = React.createContext();

const TransactionOptions = [
  "Incoming",
  "Module",
  "Pending",
  "Multisig",
  "All"
]

const categories = [
  {
    name: "Engineering",
  },
  {
    name: "Sales",
  },
  {
    name: "Accounting",
  },
  {
    name: "Miscellaneous",
  },
  {
    name: "Engineering",
  },
  {
    name: "Sales",
  },
  {
    name: "Accounting",
  },
  {
    name: "Miscellaneous",
  },
  {
    name: "Engineering",
  },
  {
    name: "Sales",
  },
  {
    name: "Accounting",
  },
  {
    name: "Miscellaneous",
  },
]

function DashboardProvider({ children }) {
  const { address, chain } = useAccount();
  // const { tokensOwnedByUser } = useGetTokens(address);
  const [activeTab, setActiveTab] = useState("wallet");
  const[transactionType, setTransactionType] = useState("All");
  const { user } = React.useContext(UserContext);
  const { apiKit, safeSelected } = useAccountAbstraction();
  
  const transactionHistory = useTransactionHistory(safeSelected, apiKit, transactionType);

  const config = useConfig();
  const options = getBalanceQueryOptions(config, { address: address });
  const balance = useSuspenseQuery(options); 

  const filterTransactions = useCallback((filter) => {
    TransactionOptions.includes(filter) && setTransactionType(filter);
  },[setTransactionType]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  const { data: ensName } = useEnsAvatar({
    name: normalize(address),
    cacheTime: 2_000,
  });


  return (
    <DashboardContext.Provider
      value={{
        address,
        chain,
        ensName,
        transactionType,
        nativeBalance: 
        formatUnits(balance?.data?.value, balance?.data?.decimals),
        symbol: balance?.data?.symbol,
        // tokensOwnedByUser,
        transactionHistory,
        activeTab,
        handleTabChange,
        categories,
        filterTransactions
      }}
    >
      {user && user.address && user.address === address && children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;
