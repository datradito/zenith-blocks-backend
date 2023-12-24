import React from "react";
import SubHeader from "../../molecules/SubHeader/SubHeader";
import Label from "../../atoms/Label/Label";
import GoBack from "../../atoms/GoBack/GoBack";
import Breadcrumbs from "../../atoms/BreadCrumbs/BreadCrumbs";
import { useSelector } from "react-redux";

function PaymentSubHeader() {
  const { proposal, Budget } = useSelector((state) => ({
    proposal: state.currentProposal.proposal,
    Budget: state.currentBudget.Budget,
  }));
  return (
    <SubHeader.Container sx={{ paddingTop: "1rem" }}>
      <SubHeader.List
        sx={{
          flexDirection: "column",
          gap: "2.5rem",
          margin: "0",
        }}
      >
        <Label>
          <Breadcrumbs id={proposal.id} secondaryId={Budget.id} />
        </Label>
        <GoBack>
          <Label>Invoices</Label>
        </GoBack>
      </SubHeader.List>
    </SubHeader.Container>
  );
}

export default PaymentSubHeader;
