import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from "./CreateBudget.style";
import FormItem from "../../atoms/FormItem/FormItem";
import SubHeader from '../../molecules/SubHeader/SubHeader';
import useWeb3IpfsContract from '../../hooks/web3IPFS';
import getPathAfterBudgetId from '../../../Utility/getBudgetId';
import useFilteredProposalAmount from '../../hooks/useFilteredProposalAmount';
import useSubmitBudget from '../../hooks/Budgets/useSubmitBudget';
import CustomizedSnackbars from '../../atoms/SnackBar/SnackBar';

function CreateBudget() {

  const { proposals } = useSelector(state => state.currentProposalAmounts);
  const { error, loading, submitBudget } = useSubmitBudget();
  const { web3, contract } = useWeb3IpfsContract();
  let { proposal } = useSelector(state => state.currentProposal);
  let { items } = useSelector(state => state.createBudget);
  
  const [budgetError, setBudgetError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [budgetErrorKey, setBudgetErrorKey] = useState(0);

  const navigate = useNavigate();

  const classes = useStyles();

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
      setBudgetError("Please fill out all fields");
      setBudgetErrorKey(budgetErrorKey + 1);
      return false;
    }


    if (parseInt(items[0].amount) > parseInt(filteredProposalAmount)) {
      setBudgetError("Budget amount cannot be greater than proposal amount");
      setBudgetErrorKey(budgetErrorKey + 1);
      return false;
    }

    return true
  }

  const handleSaveProposal = async () => {
    let proposalId = proposal.id;

    if (!validateBudget()) {
      console.log("Budget validation failed");
      return;
    }
    
    try {
      const budgetData = { ...items[0], proposalid: proposalId, rootpath: proposalId, amount: parseInt(items[0].amount), breakdown: parseInt(items[0].breakdown) };

      console.log(budgetData)
      await submitBudget(budgetData);
      setSuccessMessage("Budget Saved Successfully");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      navigate(`/proposals/${proposalId}`);
    } catch (error) {
      setBudgetError('Error submitting budget:', error.message);
      setBudgetErrorKey(budgetErrorKey + 1);
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
        // subButton: {
        //   label: "View Proposal",
        //   innerText: "View Proposal",
        //   type: "link",
        //   to: `/proposals/${proposal.id}`,
        //   message: "Proposal Saved Successfully",
        // }
      }
    ];

  const currentPathConfig = {
    path: "Create Budget",
    to: `/proposals/${proposal.id}`
  }


  return (
    <div>
      <SubHeader buttonConfig={componentButtonConfig} currentPath={currentPathConfig} previousPath="Proposals  Proposal  Budget" />
      <div className={classes.BoxStyle}>
        <FormItem
          initialValues={dataForItemCard}
          type="budget"
          errors={budgetError ? budgetError : null}
          key={budgetErrorKey}
        />
      </div>
      {successMessage && (
        <CustomizedSnackbars key="success" message={successMessage} severity="success" autoOpen={true} />
      )}
    </div>
  )
}

export default CreateBudget;