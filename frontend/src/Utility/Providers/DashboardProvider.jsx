import React, {useState} from "react";
import { useAccount, useNetwork, useEnsAvatar, useBalance } from "wagmi";
import { useGetTokens } from "../../Components/hooks/Dashboard/useGetTokens";
import useTransactionHistory from "../../Components/hooks/Dashboard/useTransactionHistory";
import { UserContext } from "./UserProvider";

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
  const { address } = useAccount();
  const { chain: networkChain } = useNetwork();
  const { tokensOwnedByUser } = useGetTokens(address);
  const transactionHistory = useTransactionHistory(address);
  const [activeTab, setActiveTab] = useState("wallet");
  const { user } = React.useContext(UserContext);


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  const balance = useBalance({
    address: address,
  });

  const { data: ensName } = useEnsAvatar({
    address: address,
    cacheTime: 2_000,
  });


  //i have a nav child component that will be used to switch between the different tabs, create necessary state and pass it down to the child component


  return (
    <DashboardContext.Provider
      value={{
        address,
        networkChain,
        ensName,
        nativeBalance: (
          Number(balance?.data?.value) / Math.pow(10, 18)
        ).toFixed(5),
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
