import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItemCardComponent from "../../atoms/ItemCard/ItemCard.jsx";
import SubHeader from "../../molecules/SubHeader/SubHeader.jsx";
import GoBack from "../../atoms/GoBack/GoBack.jsx";
import Label from "../../atoms/Label/Label.jsx";
import Breadcrumbs from "../../atoms/BreadCrumbs/BreadCrumbs.jsx";
import BudgetList from "../budgets/BudgetList.jsx";
import Container from "../../atoms/Container/Container.jsx";
import useProposalIsEditable from "../../hooks/Proposals/useProposalIsEditable.jsx";
import useProposalDetails from "../../hooks/Proposals/useProposalDetails.jsx";
import {useGetBudgets} from "../../hooks/Budgets/useGetBudgets.jsx";
import CircularIndeterminate from "../../atoms/Loader/loader.jsx";

function ProposalDetailView() {
  const navigate = useNavigate();

  const { proposalId } = useParams();
  const { loading, data } = useProposalDetails(proposalId);
  const { amount, status } = useProposalIsEditable(proposalId);

   const { isLoading, budgets } = useGetBudgets(amount, proposalId);

  const handleUpdateProposal = async () => {
    !status && navigate(`/budgets/${proposalId}/create`);
  };

  return (
    <div>
      <SubHeader.Container>
        <SubHeader.List
          sx={{
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          <Label>
            <Breadcrumbs />
          </Label>
          <GoBack>
            <Label>Proposals</Label>
          </GoBack>
        </SubHeader.List>
        <SubHeader.List>
          <SubHeader.ExportCSVButton
            label="CSV Report"
            data={budgets || []}
            filename="Budgets"
            sx={{
              backgroundColor: "#282A2E",
            }}
          />
          <SubHeader.ActionButton
            label="Create Budget"
            onClick={handleUpdateProposal}
            disabled={status || !amount}
            info={status ? "Proposal is fully budgeted" : ""}
          />
        </SubHeader.List>
      </SubHeader.Container>

      {loading ? (
        <CircularIndeterminate />
      ) : (
        data?.proposal && <ItemCardComponent />
      )}
      <Container
        style={{
          border: "0.05rem #2c2c2c solid",
          margin: "1rem 0",
        }}
      >
        <BudgetList isLoading={isLoading} budgetList={budgets} />
      </Container>
    </div>
  );
}

export default ProposalDetailView;
