import React from "react";
import { useSelector } from "react-redux";
import CircularIndeterminate from "../../Components/atoms/Loader/loader.jsx";
import { useGetAllInvoices } from "../../Components/hooks/Invoices/useGetInvoices";
import { useGetBudgetById } from "../../Components/hooks/Budgets/useGetBudgetById";

export const InvoiceContext = React.createContext();

function InvoiceProvider({ children }) {
  const { proposal, Budget } = useSelector((state) => ({
    proposal: state.currentProposal.proposal,
    Budget: state.currentBudget.Budget,
  }));
  const {
    isLoading,
    invoices,
    refetchInvoices,
  } = useGetAllInvoices(Budget?.id);
  const { budget } = useGetBudgetById(Budget.id);

    if (isLoading) {
        return (
            <>
                <CircularIndeterminate />
            </>
        );
    }

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        refetchInvoices,
        Budget,
        budget,
        proposal,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export default InvoiceProvider;
