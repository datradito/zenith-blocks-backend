import React from 'react'
import { useSelector } from 'react-redux';
import FormItem from "../../atoms/FormItem/FormItem";
import SubHeader from '../../molecules/SubHeader/SubHeader';
import useFilteredProposalAmount from '../../hooks/Proposals/useFilteredProposalAmount';
import {useSubmitBudget} from '../../hooks/Budgets/useSubmitBudget';
import { prepareBudgetDataForSubmission, validateBudget } from '../../../Services/BudgetServices/budgetService';
import { Box, Typography } from '@mui/material';
import CircularIndeterminate from '../../atoms/Loader/loader';
import GoBack from '../../atoms/GoBack/GoBack';
import Label from '../../atoms/Label/Label';


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
      const budgetData = prepareBudgetDataForSubmission(items[0], proposalId);
    submitBudget(
      { ...budgetData },
      {
        onSuccess: () => {
          //alternatively we can use queryClient.invalidateQueries() to refetch the data or use refetchQueries
          console.log("Budget created successfully");
        }
      }
    );
  };



  if (isSubmitting) {
    <CircularIndeterminate />
  }


  return (
    <Box>
      <SubHeader.Container>
        <SubHeader.List
          sx={{
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          <Label>
            Proposals | Budget
            </Label>
          <GoBack>
            <Label>
              Budgets
            </Label>
          </GoBack>
        </SubHeader.List>
        <SubHeader.List>
          <SubHeader.ActionButton
            label="Delete Proposal"
            sx={{
              backgroundColor: "#FC4F4F",
            }}
          />
          <SubHeader.ActionButton
            label="Save Proposal"
            onClick={handleCreateBudget}
            disabled={false}
          />
        </SubHeader.List>
      </SubHeader.Container>
      <Box
        sx={{
          width: "90%",
          margin: "0rem auto",
          textAlign: "center",
          border: `.05rem #2C2C2C solid`,
          marginTop: "1rem",
          borderRadius: 5,
        }}
      >
        <FormItem initialValues={dataForItemCard} type="budget" />
      </Box>
    </Box>
  );
}

export default CreateBudget;