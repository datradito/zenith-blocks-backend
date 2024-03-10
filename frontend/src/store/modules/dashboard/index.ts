import { create } from "zustand";
import persist from "../../../utils/persist";

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
];

const TransactionOptions = [
  "Success",
  "Failed",
  "Pending",
  "Ready"
];

interface TransactionFilter {
  activeTab: string;  
  status: string[];
}

type DashboardStore = {
  activeTab: string;
  onChangeActiveTab: (activeTab: string) => void;
  transactionFilter: TransactionFilter;
  onChangeTransactionFilter: (transactionFilter: TransactionFilter) => void;
  categories: { name: string }[];
  loading: boolean;
  onChangeLoading: (loading: boolean) => void;
  transactions: any[];
  setTransactions: (transactions: any[]) => void;
  reset: () => void;
};

const initialState = {
  activeTab: "wallet",
  transactionFilter: {
    activeTab: "All",
    status: [],
  },
  categories,
  loading: false,
  transactions: [],
};



const useDashboardStore = create<DashboardStore>(
  //@ts-ignore
  persist(
    {
      key: "dashboard",
      allowlist: [
        "activeTab",
        "transactionFilter",
        "categories",
        "transactions",
        "loading",
      ],
    },
    //@ts-ignore
    (set: Function) => ({
      ...initialState,
      onChangeTransactionFilter: (newTransactionFilter: TransactionFilter) => {
        set((state) => ({
          transactionFilter: {
            ...state.transactionFilter,
            ...newTransactionFilter,
          },
        }));
      },
      onChangeActiveTab: (activeTab: string) => {
        set(() => ({
          activeTab,
        }));
      },
      onChangeLoading: (loading: boolean) => {
        set(() => ({
          loading,
        }));
      },
      setTransactions: (transactions: any[]) => {
        set(() => ({
          transactions,
        }));
      },
      reset: () => {
        set(() => initialState);
      },
    })
  )
);

export default useDashboardStore;
