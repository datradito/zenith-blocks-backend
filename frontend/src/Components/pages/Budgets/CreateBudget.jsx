import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import useStyles from "./CreateBudget.style";
// import * as yup from 'yup';
import FormItem from "../../atoms/FormItem/FormItem";
import FormRow from "../../molecules/FormBudgetCreation/index";
import SubHeader from '../../molecules/SubHeader/SubHeader';

function CreateBudget() {
  let { proposal } = useSelector(state => state.currentProposal);
  const classes = useStyles();
  let budget = useSelector(state => state.createBudget);
  

  let dataForItemCard = {};
  
  useEffect(() => {
    //console.log(budget);
  }, [budget])

  if (proposal) {
    dataForItemCard = { "Goverance": `${proposal.space.name}`, "Total Budget": "5,980,000", "Proposal": `${proposal.title}`, "Ipfs Link" : `${proposal.ipfs}`}
  }
  // else {
  //   let storedState = localStorage.getItem('persist:root');
  //   let data = JSON.parse(storedState).currentProposal;
  //   let proposal = JSON.parse(data).proposal;
  //   console.log(proposal)
  //   dataForItemCard = { "Goverance": JSON.parse(data).proposal.space.name, "Total Budget": "$5,980,000", "Proposal": JSON.parse(data).proposal.title, "Ipfs Link": `${JSON.parse(data).proposal.ipfs}` };
  // }


  //Todo: Get CID from smartContract using proposalId, Upon submission of budget, Get Data from IPFS for that CID and append new data to it, add new file to Ipfs and update cid in smartContract.

    // useEffect(() => {
    //     const fetchBudgetCID = async () => {
    //         try {
    //             const budgetCID = await contract.getBudgetCID(budgetId);
    //             setCID(budgetCID);
    //         } catch (error) {
    //             console.error('Failed to fetch budget CID:', error);
    //         }
    //     };

    //     fetchBudgetCID();
    // }, [proposalId]);

    // useEffect(() => {
    //     const fetchBudgetData = async () => {
    //         try {
    //             setIsLoading(true);
    //             const budgetFile = await getFileFromIPFS(cid);
    //             setBudgetData(budgetFile);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error('Failed to fetch budget data:', error);
    //             setIsLoading(false);
    //         }
    //     };

  

  const handleSaveProposal = () => {

    console.log(budget);
  };

  const handleDeleteProposal = () => {
    console.log("Delete Proposal");
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
        subButton: {
          label: "View Proposal",
          innerText: "View Proposal",
          type: "link",
          to: `/proposals/${proposal.id}`,
          message: "Proposal Saved Successfully",
        }
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
        <FormItem initialValues={dataForItemCard} type="budget" />
        <FormRow tableHeaderData={["", "Category", "Currency", "Percentage", "Breakdown"]}/>
      </div>
    </div>
  )
}

export default CreateBudget;