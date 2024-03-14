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

interface Contact {
  id: string;
  name: string;
  address: string;
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
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
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
  contacts: []
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
        "contacts",
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
      setContacts: (contacts: Contact[]) => {
        console.log("contacts", contacts)
        set(() => ({
          contacts,
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
