import * as React from "react";
import Chip from "@mui/material/Chip";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import { Link } from "react-router-dom";
import useBudgetStore from "../../../store/modules/budgets/index.ts";

export default function CustomInvoiceViewIcon({budget }) {
  const setCurrentBudget = useBudgetStore((state) => state.setCurrentBudget);
  const invoiceIconStyles = {
    chipStyle: {
      padding: "0 .25rem",
      color: "white",
      backgroundColor: "#242b33",
      fontSize: "0.75rem",
      "& .MuiSvgIcon-root": {
        color: "#1A65C0",
        fontSize: "0.75rem",
      },
    },
  };
    
    const handleClick = () => {
      const {Breakdown, Invoices, proposalid, ...rest} = budget;
    setCurrentBudget(rest);
  };

  return (
    <Link to={`/budgets/${budget.id}/invoices`}>
      <Chip
        icon={<DescriptionRoundedIcon />}
        label="Bills"
        onClick={handleClick}
        sx={invoiceIconStyles.chipStyle}
      />
    </Link>
  );
}
