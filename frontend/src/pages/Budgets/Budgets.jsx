import React, { useMemo } from "react";

import { Button } from "@mui/material";
import { message } from "antd";

import BudgetList from "../../components/features/budgets/BudgetList.jsx";
import CreateBudget from "../../components/features/budgets/CreateBudget.jsx";

import useProposalStore from "../../store/modules/proposal/index.ts";
import { useGetBudgets } from "../../components/hooks/Budgets/useGetBudgets.jsx";

import Modal from "../../components/molecules/Modal/Modal.jsx";
import SubHeader from "../../components/molecules/SubHeader/SubHeader.jsx";

import GoBack from "../../components/atoms/GoBack/GoBack.jsx";
import ItemCardComponent from "../../components/atoms/ItemCard/ItemCard.jsx";
import Label from "../../components/atoms/Label/Label.jsx";
import Breadcrumbs from "../../components/atoms/BreadCrumbs/BreadCrumbs.jsx";
import Container from "../../components/atoms/Container/Container.jsx";
import CircularIndeterminate from "../../components/atoms/Loader/loader.jsx";
import EmptyIcon from "../../components/atoms/EmptyIcon/EmptyIcon.jsx";

function Budgets() {
  const { currentProposal } = useProposalStore();
  
  const { id, description, amount, status, ...rest } = currentProposal;
  const { isLoading, budgets } = useGetBudgets(rest.amount, id);
  if (!amount) {
   message.warning("Assign amount to proposal to create budget");
  }

  const header = useMemo(() => {
    return (
      <SubHeader.Container>
        <SubHeader.List>
          <Label>
            <Breadcrumbs />
          </Label>
          <GoBack>
            <Label>Proposals</Label>
          </GoBack>
        </SubHeader.List>
        <SubHeader.List styles={{ flexDirection: "row", gap: "1rem" }}>
          <SubHeader.ExportCSVButton
            label="CSV Report"
            data={budgets || []}
            filename="Budgets"
          />

          <Modal>
            <Modal.Open opens="createBudget">
              <Button
                variant="contained"
                label="Create Budget"
                // onClick={handleCreateBudget}
                disabled={status === "Filled" || !amount}
                info={status ? "Proposal is fully budgeted" : ""}
              >
                Create Budget
              </Button>
            </Modal.Open>
            <Modal.Window name="createBudget">
              <CreateBudget />
            </Modal.Window>
          </Modal>
        </SubHeader.List>
      </SubHeader.Container>
    );
  }, [id, budgets, rest, amount, isLoading]);

  const budgetList = useMemo(() => {
    if (isLoading) {
      return <CircularIndeterminate />;
    }

    if (budgets && budgets.length > 0) {
      return <BudgetList isLoading={isLoading} budgetList={budgets} />;
    }
    return <EmptyIcon />;
  }, [isLoading, budgets]);

  return (
    <div>
      {header}
      <ItemCardComponent />
      <Container>{budgetList}</Container>
    </div>
  );
}

export default Budgets;
