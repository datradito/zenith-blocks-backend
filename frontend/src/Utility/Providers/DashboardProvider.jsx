import React, {useState} from "react";
import { useAccount, useEnsAvatar } from "wagmi";
import { normalize } from "viem/ens";
import { useGetTokens } from "../../Components/hooks/Dashboard/useGetTokens";
import useTransactionHistory from "../../Components/hooks/Dashboard/useTransactionHistory";
import { UserContext } from "./UserProvider";
import { formatUnits } from "viem"; 
import { useSuspenseQuery } from "@tanstack/react-query";
import { useConfig } from "wagmi";
import { getBalanceQueryOptions } from "wagmi/query"; 

export const DashboardContext = React.createContext();

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
  const { tokensOwnedByUser } = useGetTokens(address);
  const transactionHistory = useTransactionHistory(address);
  const [activeTab, setActiveTab] = useState("wallet");
  const { user } = React.useContext(UserContext);

  const config = useConfig();
  const options = getBalanceQueryOptions(config, { address: address });
  const balance = useSuspenseQuery(options); 


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  const { data: ensName } = useEnsAvatar({
    name: normalize(address),
    cacheTime: 2_000,
  });


  //i have a nav child component that will be used to switch between the different tabs, create necessary state and pass it down to the child component


  return (
    <DashboardContext.Provider
      value={{
        address,
        chain,
        ensName,
        nativeBalance: 
        formatUnits(balance?.data?.value, balance?.data?.decimals),
        symbol: balance?.data?.symbol,
        tokensOwnedByUser,
        transactionHistory,
        activeTab,
        handleTabChange,
        categories
      }}
    >
      {user && user.address && user.address === address && children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;
