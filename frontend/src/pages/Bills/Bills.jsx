import React, { useMemo, useEffect } from "react";
import { useMatch } from "react-router-dom";

import SubHeader from "../../components/molecules/SubHeader/SubHeader";
import ItemCardComponent from "../../components/atoms/ItemCard/ItemCard";
import CircularIndeterminate from "../../components/atoms/Loader/loader";
import BillList from "../../components/features/bills/BillList.jsx";
import EmptyIcon from "../../components/atoms/EmptyIcon/EmptyIcon";
import Label from "../../components/atoms/Label/Label";
import GoBack from "../../components/atoms/GoBack/GoBack";
import Container from "../../components/atoms/Container/Container";
import Breadcrumbs from "../../components/atoms/BreadCrumbs/BreadCrumbs";
import Modal from "../../components/molecules/Modal/Modal";
import { Button } from "@mui/material";
import FilterBills from "../../components/molecules/Bills/FilterBills";
import useProposalStore from "../../store/modules/proposal/index.ts";
import useBillStore from "../../store/modules/bills/index.ts";
import { useGetBills } from "../../components/hooks/Invoices/useGetBills.jsx";
import useBudgetStore from "../../store/modules/budgets/index.ts";
import CreateBill from "../../components/features/bills/CreateBill.jsx";

function Bills() {
  const match = useMatch("/bills/misc");
  const { billFilter } = useBillStore();
  const { bills, isLoading } = useGetBills(billFilter);
  const { currentProposal: proposal } = useProposalStore();
  const currentBudget = useBudgetStore((state) => state.currentBudget);

  const header = useMemo(() => {
    return (
      <SubHeader.Container>
        {match ? (
          <SubHeader.List>
            <Label>Bills</Label>
          </SubHeader.List>
        ) : (
          <SubHeader.List>
            <Label>
              <Breadcrumbs id={proposal?.id} />
            </Label>
            <GoBack>
              <Label>Budgets</Label>
            </GoBack>
          </SubHeader.List>
        )}
        <SubHeader.List styles={{ flexDirection: "row", gap: "1rem" }}>
          <SubHeader.ExportCSVButton
            label="Export CSV"
            data={bills || []}
            filename="Invoices"
            sx={{
              backgroundColor: "#282A2E",
            }}
          />
          <Modal>
            <Modal.Open opens="createBill">
              <Button variant="contained" label="Create Bill">
                Create Bill
              </Button>
            </Modal.Open>
            <Modal.Window name="createBill">
              <CreateBill />
            </Modal.Window>
          </Modal>
        </SubHeader.List>
      </SubHeader.Container>
    );
  }, [bills, match]);

  const budgetInfo = useMemo(() => {
    if (match) return null;
    return (
      <>
        <Container direction={"row"}>
          <ItemCardComponent.ItemCard
            label="Category"
            value={currentBudget?.category}
          />
          <ItemCardComponent.ItemCard
            label="Amount"
            value={currentBudget?.amount}
          />
          <ItemCardComponent.ItemCard
            label="Currency"
            value={currentBudget?.currency}
          />
        </Container>
      </>
    );
  }, [currentBudget]);

  const content = useMemo(() => {
    if (isLoading) {
      return <CircularIndeterminate />;
    }

    if (bills && bills.length > 0) {
      return <BillList isLoading={isLoading} invoices={bills} />;
    }

    return <EmptyIcon />;
  }, [bills, isLoading]);

  return (
    <div>
      {header}

      {match ? null : <ItemCardComponent />}

      {budgetInfo}

      <FilterBills />

      <Container>{content}</Container>
    </div>
  );
}

export default Bills;
