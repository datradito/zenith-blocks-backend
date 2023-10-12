import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItemCardComponent from "../../atoms/ItemCard/ItemCard.jsx";
import SubHeader from "../../molecules/SubHeader/SubHeader.jsx";
import GoBack from "../../atoms/GoBack/GoBack.jsx";
import Label from "../../atoms/Label/Label.jsx";
import Breadcrumbs from "../../atoms/BreadCrumbs/BreadCrumbs.jsx";
import BudgetList from "../../features/budgets/BudgetList.jsx";
import Container from "../../atoms/Container/Container.jsx";
import useProposalIsEditable from "../../hooks/Proposals/useProposalIsEditable.jsx";

function ProposalDetailView() {
  const { proposalId } = useParams();
  const navigate = useNavigate();

  const { amount, status } = useProposalIsEditable(proposalId);

  const handleUpdateProposal = async () => {
    !status && navigate(`/budgets/${proposalId}/create`);
  };

  return (
    <>
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
          <SubHeader.ActionButton
            label="CSV Report"
            sx={{
              backgroundColor: "#282A2E",
            }}
          />
          <SubHeader.ActionButton
            label="Create Budget"
            onClick={handleUpdateProposal}
            disabled={status || !amount}
          />
        </SubHeader.List>
      </SubHeader.Container>

      <ItemCardComponent />

      <Container
        style={{
          border: "0.05rem #2c2c2c solid",
          margin: "1rem 0",
        }}
      >
        <BudgetList amount={amount} proposalId={proposalId} />
      </Container>
    </>
  );
}

export default ProposalDetailView;
