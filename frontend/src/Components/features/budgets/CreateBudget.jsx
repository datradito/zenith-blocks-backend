import React, { useEffect } from "react";

import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import { message } from "antd";

import CreateBudgetForm from "./CreateBudgetForm.jsx";

import { useSubmitBudget } from "../../hooks/Budgets/useSubmitBudget.jsx";
import useGetRemainingProposalAmount from "../../hooks/Proposals/useGetRemainingProposalAmount.jsx";

import useProposalStore from "../../../store/modules/proposal/index.ts";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";

import CircularIndeterminate from "../../atoms/Loader/loader.jsx";

function CreateBudget({onCloseModal}) {
  const { currentProposal, setCurrentProposal } = useProposalStore();
  const { categories } = useDashboardStore();
  const { loading, submitBudgetMutation } = useSubmitBudget();
  const { remainingProposalAmount, loading: remainingLoading } =
    useGetRemainingProposalAmount(currentProposal?.id);

  const methods = useForm({
    defaultValues: {
      Goverance: currentProposal.space,
      "Total Budget": currentProposal.amount,
      Proposal: currentProposal.title,
      Breakdown: 0,
      category: categories[0].name,
      currency: currentProposal?.currency,
    },
  });

  const { setValue } = methods;

  // Use useEffect to update the Currency field when currency changes
  useEffect(() => {
    setValue("currency", currentProposal?.currency);
  }, [currentProposal, remainingLoading, setValue]);

  const handleCreateBudget = async(data) => {
    const budgetData = {
      amount: parseInt(data.amount),
      currency: data.currency,
      proposalid: currentProposal.id,
      category: data.category,
      breakdown:
        (parseInt(data.amount) / parseInt(currentProposal.amount)) * 100,
    };

    try {
      await submitBudgetMutation({ variables: { budget: budgetData } });
      setCurrentProposal({
        ...currentProposal,
        status: remainingProposalAmount - budgetData.amount === 0 ? "Funded" : currentProposal.status,
      });
      onCloseModal();
    } catch (error) {
      message.error(`Failed to create budget: ${error}`);
    }

  };

  return (
    <FormProvider {...methods}>
      {remainingLoading || loading ? (
        <CircularIndeterminate />
      ) : (
        <CreateBudgetForm
          handleCreateBudget={handleCreateBudget}
          loading={loading}
          remainingProposalAmount={remainingProposalAmount}
        />
      )}
      <Button
        onClick={() => methods.handleSubmit(handleCreateBudget)()}
        disabled={loading || remainingProposalAmount === 0}
        sx={{
          widht: "2rem",
          height: "2rem",
          "&:hover": {
            backgroundColor: "#E0E0E0",
          },
        }}
        type="submit"
        variant="outlined"
        endIcon={<ArrowCircleRightIcon />}
      >
        Submit
      </Button>
    </FormProvider>
  );
}

export default CreateBudget;
