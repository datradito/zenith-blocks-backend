import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useInvoice } from "../../../Utility/Providers/InvoiceProvider";

import SubHeader from "../../molecules/SubHeader/SubHeader";
import ItemCardComponent from "../../atoms/ItemCard/ItemCard";
import CircularIndeterminate from "../../atoms/Loader/loader";
import InvoiceList from "../../features/invoices/InvoiceList";
import EmptyIcon from "../../atoms/EmptyIcon/EmptyIcon";
import Label from "../../atoms/Label/Label";
import GoBack from "../../atoms/GoBack/GoBack";
import Container from "../../atoms/Container/Container";
import Breadcrumbs from "../../atoms/BreadCrumbs/BreadCrumbs";
import List from "../../atoms/List/List";
import styled from "styled-components";
import FilterInvoices from "../../molecules/Invoices/FilterInvoices";

const BudgetInfo = styled(List)`
  margin: 0rem;
  border: 2px solid #282a2e;
  border-radius: 0.5rem;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

function InvoiceListView() {
  const { Budget, budget, proposal, invoices, isLoading, refetchInvoices } =
    useInvoice();

  const navigate = useNavigate();

  const header = useMemo(() => {
    const handleCreateInvoice = () => {
      navigate(`/invoices/${Budget.id}/create`);
    };

    return (
      <SubHeader.Container>
        <SubHeader.List>
          <Label>
            <Breadcrumbs id={proposal.id} />
          </Label>
          <GoBack>
            <Label>Budgets</Label>
          </GoBack>
        </SubHeader.List>
        <SubHeader.List styles={{ flexDirection: "row", gap: "1rem" }}>
          <SubHeader.ExportCSVButton
            label="Export CSV"
            data={invoices || []}
            filename="Invoices"
            sx={{
              backgroundColor: "#282A2E",
            }}
          />
          <SubHeader.ActionButton
            onClick={handleCreateInvoice}
            label="Create Invoice"
          />
        </SubHeader.List>
      </SubHeader.Container>
    );
  }, [proposal.id, invoices, navigate, Budget.id]);

  const budgetInfo = useMemo(() => {
    return (
      <BudgetInfo>
        <ItemCardComponent.ItemCard label="Category" value={budget?.category} />
        <ItemCardComponent.ItemCard label="Amount" value={budget?.amount} />
        <ItemCardComponent.ItemCard label="Currency" value={budget?.currency} />
      </BudgetInfo>
    );
  }, [budget]);

  const content = useMemo(() => {
    if (isLoading) {
      return <CircularIndeterminate />;
    }

    if (invoices && invoices.length > 0) {
      return <InvoiceList isLoading={isLoading} invoices={invoices} />;
    }

    return <EmptyIcon />;
  }, [invoices, isLoading]);

  return (
    <div>
      {header}

      <ItemCardComponent />

      {budgetInfo}

      <FilterInvoices refetchInvoices={refetchInvoices} />

      <Container>{content}</Container>
    </div>
  );
}

export default InvoiceListView;
