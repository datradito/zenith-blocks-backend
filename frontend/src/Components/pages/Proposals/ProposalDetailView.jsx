import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProposal } from "../../../actions/currentProposal/index.js";
import { refreshState } from "../../../actions/createBudgetAction/index.js";
import ItemCardComponent from "../../atoms/ItemCard/ItemCard.jsx";
import SubHeader from "../../molecules/SubHeader/SubHeader.jsx";
import CircularIndeterminate from "../../atoms/Loader/loader.jsx";
import GoBack from "../../atoms/GoBack/GoBack.jsx";
import useProposalDetails from "../../hooks/Proposals/useProposalDetails.jsx";
import Label from "../../atoms/Label/Label.jsx";
import Breadcrumbs from "../../atoms/BreadCrumbs/BreadCrumbs.jsx";
import BudgetList from "../../features/budgets/BudgetList.jsx";
import Container from "../../atoms/Container/Container.jsx";

function ProposalDetailView() {
  const { proposalId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, data } = useProposalDetails(proposalId);
  const { proposals } = useSelector((state) => state.currentProposalAmounts);
  const [pageWarnings, setPageWarnings] = useState();
  const [amount, setProposalAmount] = useState(0);
  const [status, setStatus] = useState();

  dispatch(refreshState());

  const filteredProposal = useMemo(() => {
    return proposals.filter((proposal) =>
      proposal.id === proposalId ? proposal : null
    );
  }, [proposalId, proposals]);

  useEffect(() => {
    setProposalAmount(filteredProposal[0]?.amount);
    setStatus(filteredProposal[0]?.status === "Funded" ? true : false);
  }, [filteredProposal]);

  const handlePageValidation = () => {
    setPageWarnings(["Either Proposal is already filled or Missing Amount"]);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      // dispatch(setProposal(data.proposal));
    }
  }, [data]);

  useEffect(() => {
    !amount ? handlePageValidation() : setPageWarnings(null);
  }, [amount]);

  //TOdo: move budget loading to tableDisplay to localize the loading
  if (loading ) return <CircularIndeterminate />;


  const handleUpdateProposal = async () => {
    (!amount || status) && handlePageValidation();
    !status && !pageWarnings && navigate(`/budgets/${proposalId}/create`);
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
