import { create } from "zustand";


//this is place holder store onyl, still work in progress
interface BillFilter {
    status: string;
    budgetid: string;
}

const initialState = {
    bills: [],
    bill: null,
    billLoading: false,
    billFilter: {
        status: "All",
        budgetid: "",
    },
}

interface BillStore {
    bills: any[];
    bill: any | null;
    billLoading: boolean;
    billFilter: BillFilter;
    setBills: (bills: any[]) => void;
    setBill: (bill: any) => void;
    setBillFilter: (filter: BillFilter) => void;
}

const useBillStore = create<BillStore>((set) => ({
    ...initialState,
    setBills: (bills) => {
        set(() => ({
            bills,
        }));
    },
    setBill: (bill) => {
        set(() => ({
            bill,
        }));
    },
    setBillLoading: (loading) => {
        set(() => ({
            billLoading: loading,
        }));
    },
    setBillFilter: (filter) => {
        set(() => ({
            billFilter: filter,
        }));
    },
}));

export default useBillStore;