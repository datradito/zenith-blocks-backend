import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProposal } from "../../../actions/currentProposal/index.js";
import { refreshState } from "../../../actions/createBudgetAction/index.js";
import ItemCard from "../../atoms/ItemCard/ItemCard.jsx";
import SubHeader from "../../molecules/SubHeader/SubHeader.jsx";
import CircularIndeterminate from "../../atoms/Loader/loader.jsx";
import useProposalDetails from "../../hooks/Proposals/useProposalDetails.jsx";
import { useGetBudgets } from "../../hooks/Budgets/useGetBudgets.jsx";
import SnackbarMessage from "../../atoms/SnackBarGql/SnackBarGql.jsx";
import EmptyIcon from "../../atoms/EmptyIcon/EmptyIcon.jsx";
import BudgetList from "../../features/budgets/BudgetList.jsx";

const BoxStyle = {
  width: "90%",
  margin: "0rem auto",
  textAlign: "center",
  color: "white",
  border: ".05rem #2c2c2c solid",
  marginTop: "1rem",
  borderRadius: 3,
  paddingBottom: "1rem",
};


function ProposalDetailView() {
  const { proposalId } = useParams();
  const dispatch = useDispatch();

  const { loading, error, data } = useProposalDetails(proposalId);
  const { proposals } = useSelector((state) => state.currentProposalAmounts);
  const [pageWarnings, setPageWarnings] = useState();
  const [amount, setProposalAmount] = useState(0);
  const [status, setStatus] = useState();

  const {isLoading, budgets} = useGetBudgets(
    proposalId,
    amount
  );
  
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
      dispatch(setProposal(data.proposal));
    }
  }, [data]);

  useEffect(() => {
    !amount ? handlePageValidation() : setPageWarnings(null);
  }, [amount]);

  //TOdo: move budget loading to tableDisplay to localize the loading
  if (loading || isLoading) return <CircularIndeterminate />;


  let dataForItemCard = {
    Goverance: data.proposal.space.name,
    "Total Budget": amount,
    Proposal: data.proposal.title,
  };


  const handleUpdateProposal = async () => {
    dispatch(setProposal(data.proposal));
  };

  const componentButtonConfig = [
    {
      label: "Export CSV",
      variant: "contained",
      innerText: "Export CSV",
      backgroundColor: "#282A2E",
      data: budgets || [],
      filetype: "budget",
    },
    {
      label: "Create Budget",
      variant: "contained",
      onClick: handlePageValidation || handleUpdateProposal,
      innerText: "Create Budget",
      disabled: status || !amount,
      ml: "0.5rem",
      type: "link",
      to: status || !amount ? null : `/proposal/update/${proposalId}`,
    },
  ];

  const currentPathConfig = {
    path: "Proposals",
    to: `/proposals`,
  };

  return (
    <div>
      <SubHeader
        buttonConfig={componentButtonConfig}
        currentPath={currentPathConfig}
        previousPath="Proposals"
      />
      <Box sx={BoxStyle}>
        <Stack
          padding={1}
          direction={"row"}
          justifyContent={"flex-start"}
          borderBottom={".05rem #2c2c2c solid"}
        >
          {Object.entries(dataForItemCard).map(([key, value]) => (
            <ItemCard key={key} label={key} value={value} />
          ))}
        </Stack>
      {isLoading ? (
        <CircularIndeterminate />
      ) : budgets && budgets.length > 0 ? (
        <BudgetList isLoading={isLoading} budgets={budgets} />
      ) : (
        <EmptyIcon />
      )}
        {pageWarnings && (
          <SnackbarMessage
            severity="error"
            message={pageWarnings}
            open={pageWarnings ? true : false}
          />
        )}
      </Box>
    </div>
  );
}

export default ProposalDetailView;
