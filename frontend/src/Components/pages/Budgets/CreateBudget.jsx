import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormItem from "../../atoms/FormItem/FormItem";
import SubHeader from '../../molecules/SubHeader/SubHeader';
import useWeb3IpfsContract from '../../hooks/web3IPFS';
import useFilteredProposalAmount from '../../hooks/Proposals/useFilteredProposalAmount';
import useSubmitBudget from '../../hooks/Budgets/useSubmitBudget';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';

function CreateBudget() {

  const { proposals } = useSelector(state => state.currentProposalAmounts);
  const { error, loading, submitBudget } = useSubmitBudget();
  const { web3, contract } = useWeb3IpfsContract();
  let { proposal } = useSelector(state => state.currentProposal);
  let { items } = useSelector(state => state.createBudget);


  const navigate = useNavigate();

  const filteredProposalAmount = useFilteredProposalAmount(proposals, proposal.id);

  let dataForItemCard = {};

  if (proposal) {
    dataForItemCard = { "Goverance": `${proposal.space}`, "Total Budget": filteredProposalAmount, "Proposal": `${proposal.title}`, "Ipfs Link": `${proposal.ipfs}` }
  }

  //Todo: Get CID from smartContract using proposalId, Upon submission of budget, Get Data from IPFS for that CID and append new data to it, add new file to Ipfs and update cid in smartContract.

  // { uploadInProgress && <p>Uploading...</p> }
  // { uploadResult && <p>Upload successful! CID: {uploadResult}</p> }
  // { uploadError && <p>Error during upload: {uploadError}</p> }

  const validateBudget = () => {
    if (items[0].category === "" || items[0].amount === "" || items[0].currency === "" || items[0].breakdown === "") {
      toast.error("Please fill out all fields");
      return false;
    }


    if (parseInt(items[0].amount) > parseInt(filteredProposalAmount)) {
      toast.error("Budget amount cannot be greater than proposal amount");
      return false;
    }

    return true
  }

  const handleSaveProposal = async () => {
    let proposalId = proposal.id;

    if (!validateBudget()) {
      return;
    }

    try {
      const budgetData = { ...items[0], proposalid: proposalId, rootpath: proposalId, amount: parseInt(items[0].amount), breakdown: parseInt(items[0].breakdown) };
      try {
        await submitBudget(budgetData);
        toast.success("Budget Saved Successfully");
      } catch (error) {
        throw new Error(error.message);
      }
      navigate(`/proposals/${proposalId}`);
    } catch (error) {
      throw new Error(error.message);
      // toast.error(`Failed to Save Budget: ${error.message}`);
    }
  };

  const handleDeleteProposal = () => {
    console.log(contract);
  };

  const componentButtonConfig =
    [
      {
        label: "Delete Proposal",
        variant: "contained",
        onClick: handleDeleteProposal,
        innerText: "Delete Proposal",
        backgroundColor: "#FC4F4F"
      }, {
        label: "Save Proposal",
        variant: "contained",
        onClick: handleSaveProposal,
        innerText: "Save Proposal",
        ml: "0.5rem",
      }
    ];

  const currentPathConfig = {
    path: "Create Budget",
    to: `/proposals/${proposal.id}`
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