import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import useStyles from "./CreateBudget.style";
// import * as yup from 'yup';
import FormItem from "../../atoms/FormItem/FormItem";
import FormRow from "../../molecules/FormBudgetCreation/index";
import SubHeader from '../../molecules/SubHeader/SubHeader';
import axios from 'axios';
import useWeb3IpfsContract from '../../hooks/web3IPFS';
import getPathAfterBudgetId from '../../../Utility/getBudgetId';
import { encryptToBytes32 } from '../../../Utility/Logical/hashTheHeck';

function CreateBudget() {
  const { web3, contract } = useWeb3IpfsContract();
  let { proposal } = useSelector(state => state.currentProposal);

  const classes = useStyles();
  let budget = useSelector(state => state.createBudget);


  let dataForItemCard = {};

  if (proposal) {
    dataForItemCard = { "Goverance": `${proposal.space.name}`, "Total Budget": "5,980,000", "Proposal": `${proposal.title}`, "Ipfs Link": `${proposal.ipfs}` }
  }



  //Todo: Get CID from smartContract using proposalId, Upon submission of budget, Get Data from IPFS for that CID and append new data to it, add new file to Ipfs and update cid in smartContract.

  // { uploadInProgress && <p>Uploading...</p> }
  // { uploadResult && <p>Upload successful! CID: {uploadResult}</p> }
  // { uploadError && <p>Error during upload: {uploadError}</p> }

  const handleSaveProposal = async () => {
    let proposalId = proposal.id;
    try {
      const dataToBeUploaded = {
        jsonData: budget.items,
        rootPath: proposalId,
      };

      const { data } = await axios.post('http://localhost:8000/ipfs/uploadBudget', dataToBeUploaded);
      let proposalIdForContract = web3.utils.keccak256(web3.utils.fromAscii(proposalId));
      data.ipfsResponses.forEach(async (budgetCID) => {
        let budgetId = getPathAfterBudgetId(budgetCID);
        try {
          const accounts = await web3.eth.getAccounts();
          budgetId = web3.utils.keccak256(web3.utils.fromAscii(budgetId));
          // budgetCID = web3.utils.keccak256(web3.utils.fromAscii(budgetCID));;
          budgetCID = encryptToBytes32(budgetCID);
          console.log("BudgetCid",budgetCID)

          console.log("proposalId", proposalId, "proposalContractId" , proposalIdForContract);
          
          await contract.methods.createBudget(proposalIdForContract, budgetId, budgetCID).send({ from: accounts[0], gas: "10000000" });
        } catch (error) {
          console.error("An error occurred while executing the method:", error);
        }
      })
    } catch (error) {
      console.error(error);
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
        <FormRow tableHeaderData={["", "Category", "Amount", "Currency", "Breakdown"]} />
      </div>
    </div>
  )
}

export default CreateBudget;