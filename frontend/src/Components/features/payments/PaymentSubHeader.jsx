import React from "react";
import SubHeader from "../../molecules/SubHeader/SubHeader";
import Label from "../../atoms/Label/Label";
import GoBack from "../../atoms/GoBack/GoBack";
import Breadcrumbs from "../../atoms/BreadCrumbs/BreadCrumbs";
import { useSelector } from "react-redux";
import Container from "../../atoms/Container/Container";
function PaymentSubHeader() {
  const { proposal, Budget } = useSelector((state) => ({
    proposal: state.currentProposal.proposal,
    Budget: state.currentBudget.Budget,
  }));
  return (
    <Container
      border="none"
    >
      <SubHeader.List
        styles={{margin: "0"}}
      >
        <Label>
          <Breadcrumbs id={proposal.id} secondaryId={Budget.id} />
        </Label>
        <GoBack>
          <Label>Invoices</Label>
        </GoBack>
      </SubHeader.List>
    </Container>
  );
}

export default PaymentSubHeader;
