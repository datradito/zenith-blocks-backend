import React from 'react'
import { useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';

import { useSubmitBudget } from '../../hooks/Budgets/useSubmitBudget';
import useGetRemainingProposalAmount from '../../hooks/Proposals/useGetRemainingProposalAmount';
import useFilteredProposalAmount from '../../hooks/Proposals/useFilteredProposalAmount';
import useGetProposalAmount from '../../hooks/Proposals/useGetProposalAmount';

import SubHeader from '../../molecules/SubHeader/SubHeader';

import GoBack from '../../atoms/GoBack/GoBack';
import Label from '../../atoms/Label/Label';
import Container from '../../atoms/Container/Container';

import CreateBudgetForm from '../../features/budgets/CreateBudgetForm';
import { toast } from "react-hot-toast";
import Breadcrumbs from '../../atoms/BreadCrumbs/BreadCrumbs';


function CreateBudget() {
  let { proposal } = useSelector(state => state.currentProposal);
  const { proposals } = useSelector(state => state.currentProposalAmounts);
  const { loading, submitBudgetMutation } = useSubmitBudget();
  const { remainingProposalAmount } = useGetRemainingProposalAmount(proposal.id);
  const filteredProposalAmount = useFilteredProposalAmount(proposals, proposal.id);
  const { currency } = useGetProposalAmount(proposal.id);

  const methods = useForm({
    defaultValues: {
      Goverance: proposal.space,
      "Total Budget": filteredProposalAmount,
      Proposal: proposal.title,
      "Ipfs Link": proposal.ipfs,
      Breakdown: 0,
      Currency: currency,
    },
  });


  const handleCreateBudget = (data) => {
    const budgetData = {
      amount: parseInt(data.amount),
      currency: data.currency,
      proposalid: proposal.id,
      category: data.category,
      breakdown:
        (parseInt(data.amount) / parseInt(filteredProposalAmount)) * 100,
      rootpath: proposal.id,
    };

    submitBudgetMutation(
      { variables: {budget: budgetData }}
    );

  };

  const onError = (errors) => {
    toast.error(errors.message);
  }


  return (
    <FormProvider {...methods}>
      <SubHeader.Container>
        <SubHeader.List
        >
          <Label>
            <Breadcrumbs id={proposal.id} />
          </Label>

          <GoBack>
            <Label>Budgets</Label>
          </GoBack>
        </SubHeader.List>
        <SubHeader.List styles={{ flexDirection: "row", gap: "1rem" }}>
          <SubHeader.ActionButton
            label="Reset Budget"
            sx={{
              backgroundColor: "#FC4F4F",
            }}
            onClick={() =>
              methods.reset({ amount: null, description: "", currency: "" })
            }
          />
          <SubHeader.ActionButton
            label="Save Budget"
            onClick={() => methods.handleSubmit(handleCreateBudget, onError)()}
            disabled={loading || remainingProposalAmount === 0}
          />
        </SubHeader.List>
      </SubHeader.Container>
        <CreateBudgetForm remainingProposalAmount={remainingProposalAmount} />
    </FormProvider>
  );
}

export default CreateBudget;