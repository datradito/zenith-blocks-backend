import React from 'react'
import { useSelector } from 'react-redux';
import FormItem from "../../atoms/FormItem/FormItem";
import SubHeader from '../../molecules/SubHeader/SubHeader';
import useFilteredProposalAmount from '../../hooks/Proposals/useFilteredProposalAmount';
import {useSubmitBudget} from '../../hooks/Budgets/useSubmitBudget';
import { prepareBudgetDataForSubmission, validateBudget } from '../../../Services/BudgetServices/budgetService';
import { Box } from '@mui/material';
import CircularIndeterminate from '../../atoms/Loader/loader';


function CreateBudget() {

  const { proposals } = useSelector(state => state.currentProposalAmounts);
  const { isSubmitting, submitBudget } = useSubmitBudget();

  let { proposal } = useSelector(state => state.currentProposal);
  let { items } = useSelector(state => state.createBudget);


  const filteredProposalAmount = useFilteredProposalAmount(proposals, proposal.id);

  let dataForItemCard = {};

  if (proposal) {
    dataForItemCard = { "Goverance": `${proposal.space}`, "Total Budget": filteredProposalAmount, "Proposal": `${proposal.title}`, "Ipfs Link": `${proposal.ipfs}` }
  }

  const handleCreateBudget = async () => {
    let proposalId = proposal.id;

    if (!validateBudget(items[0], filteredProposalAmount)) {
      return;
    }
    try {
        const budgetData = prepareBudgetDataForSubmission(items[0], proposalId);
        submitBudget(budgetData);
      } 
     catch (error) {
      throw new Error(error.message);
    }
  };


  const componentButtonConfig =
    [
      {
        label: "Delete Proposal",
        variant: "contained",
        onClick: () => { console.log("Delete Proposal") },
        innerText: "Delete Proposal",
        backgroundColor: "#FC4F4F"
      }, {
        label: "Save Proposal",
        variant: "contained",
        onClick: handleCreateBudget,
        innerText: "Save Proposal",
        ml: "0.5rem",
      }
    ];

  const currentPathConfig = {
    path: "Create Budget",
    to: `/proposals/${proposal.id}`
  }

  if (isSubmitting) {
    <CircularIndeterminate />
  }


  return (
    <Box>
      <SubHeader buttonConfig={componentButtonConfig} currentPath={currentPathConfig} previousPath="Proposals  Proposal  Budget" />
      <Box sx={{
        width: '90%',
        margin: '0rem auto',
        textAlign: "center",
        border: `.05rem #2C2C2C solid`,
        marginTop: "1rem",
        borderRadius: 5
      }}>
        <FormItem
          initialValues={dataForItemCard}
          type="budget"
        />
      </Box>
    </Box>
  )
}

export default CreateBudget;