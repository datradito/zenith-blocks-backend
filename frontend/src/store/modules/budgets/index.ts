import { create } from "zustand";
import persist from "../../../utils/persist";

interface BudgetFilter {
  status: string;
}

interface Budget {
  id: string;
  amount: number;
  currency: string;
  remaining: number;
  category: string;
}

interface BudgetStore {
  budgets: Budget[];
  currentBudget: Budget | null;
  budgetLoading: boolean;
  budgetFilter: BudgetFilter;
  setBudgets: (budgets: Budget[]) => void;
  setCurrentBudget: (budget: Budget) => void;
  setBudgetLoading: (loading: boolean) => void;
  setBudgetFilter: (filter: BudgetFilter) => void;
  reset: () => void;
}

const initialBudgetState = {
  budgets: [],
  currentBudget: null,
  budgetLoading: false,
  budgetFilter: {
    status: "All",
  },
};

const useBudgetStore = create<BudgetStore>(
  //@ts-ignore
  persist(
    {
      key: "budget",
      allowlist: ["budgets", "currentBudget", "budgetFilter"],
    },
    //@ts-ignore
    (set: Function) => ({
      ...initialBudgetState,
      setBudgets: (budgets: Budget[]) => {
        set(() => ({
          budgets,
        }));
      },
      setCurrentBudget: (budget: Budget) => {
        set(() => ({
          currentBudget: budget,
        }));
      },
      setBudgetLoading: (loading: boolean) => {
        set(() => ({
          budgetLoading: loading,
        }));
      },
      setBudgetFilter: (filter: BudgetFilter) => {
        set(() => ({
          budgetFilter: filter,
        }));
      },
      reset: () => {
        set(() => initialBudgetState);
      },
    })
  )
);

export default useBudgetStore;
