import { create } from "zustand";
import persist from "../../../utils/persist";

interface BillFilter {
  status: string;
  budgetid: string;
}

const initialState = {
  billLoading: false,
  billFilter: {
    status: "All",
  },
};

interface BillStore {
  billLoading: boolean;
  billFilter: BillFilter;
  setBillFilter: (filter: BillFilter) => void;
  reset: () => void;
}

const useBillStore = create<BillStore>()(
  //@ts-ignore
  persist(
    {
      key: "bill",
      allowlist: ["billFilter"],
    },
    //@ts-ignore
    (set: Function, get) => ({
      billLoading: false,
      billFilter: {
        status: "All",
      },
      setBillFilter: (filter: BillFilter) => {
        set((state) => ({
          ...state,
          billFilter: {
            ...state.billFilter,
            ...filter,
          },
        }));
      },
      reset: () => {
        set(initialState);
      },
    })
  )
);

export default useBillStore;
