import React, { createContext, useContext, useMemo } from "react";
import { useGetBills } from "../../Components/hooks/Invoices/useGetBills";
import PropTypes from "prop-types";

export const InvoiceContext = createContext();

const MemoizedInvoiceProvider = React.memo(function InvoiceProvider({
  children,
}) {
  const [currentFilter, setCurrentFilter] = React.useState({ status: "All" });
  const { bills, refetchBills } = useGetBills(currentFilter);

  const value = useMemo(
    () => ({
      bills,
      refetchBills,
      setCurrentFilter,
      currentFilter,
    }),
    [bills, refetchBills]
  );

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
});

MemoizedInvoiceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useInvoice = () => {
  return useContext(InvoiceContext);
};

export default MemoizedInvoiceProvider;
