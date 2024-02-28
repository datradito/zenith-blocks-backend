import React, { useMemo } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import ItemCardComponent from "../../atoms/ItemCard/ItemCard.jsx";
import SubHeader from "../../molecules/SubHeader/SubHeader.jsx";
import GoBack from "../../atoms/GoBack/GoBack.jsx";
import Label from "../../atoms/Label/Label.jsx";
import Breadcrumbs from "../../atoms/BreadCrumbs/BreadCrumbs.jsx";
import BudgetList from "../budgets/BudgetList.jsx";
import Container from "../../atoms/Container/Container.jsx";
import useProposalIsEditable from "../../hooks/Proposals/useProposalIsEditable.jsx";
import { useGetBudgets } from "../../hooks/Budgets/useGetBudgets.jsx";
import CircularIndeterminate from "../../atoms/Loader/loader.jsx";
import { Button } from "@mui/material";
import EmptyIcon from "../../atoms/EmptyIcon/EmptyIcon.jsx";


function ProposalDetailView() {
  const { proposalId } = useLoaderData();
  const navigate = useNavigate();
  const { amount, status } = useProposalIsEditable(proposalId);

  const { isLoading, budgets } = useGetBudgets(amount, proposalId);

 

  const header = useMemo(() => {
    const handleCreateBudget = async () => {
      !status && navigate(`/budgets/${proposalId}/create`);
    };

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
          <Button
            variant="contained"
            label="Create Budget"
            onClick={handleCreateBudget}
            disabled={status || !amount}
            info={status ? "Proposal is fully budgeted" : ""}
          >
            Create Budget
          </Button>
        </SubHeader.List>
      </SubHeader.Container>
    );
  }, [proposalId, budgets, status, amount]);

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

export default ProposalDetailView;
