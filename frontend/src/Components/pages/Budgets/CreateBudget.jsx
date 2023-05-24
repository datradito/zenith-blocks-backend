import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Box } from '@mui/material';
import useStyles from "./CreateBudget.style";
import * as yup from 'yup';
import FormItem from "../../atoms/FormItem/FormItem";
import FormRow from "../../molecules/Form/index";
import ButtonAtom from '../../atoms/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubHeader from '../../molecules/SubHeader/SubHeader';

function CreateBudget() {
  let { proposal } = useSelector(state => state.currentProposal);
  const classes = useStyles();

  const [formData, setFormData] = React.useState({});

  let dataForItemCard = {};
  

  if (proposal) {
    dataForItemCard = { "Goverance": `${proposal.space.name}`, "Total Budget": "5,980,000", "Proposal": `${proposal.title}`, "Ipfs Link" : `${proposal.ipfs}`}
  }

  const handleSaveProposal = () => {
    console.log("Save Proposal");
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
        <FormItem initialValues={dataForItemCard} />
        <FormRow />
      </div>
    </div>
  )
}

export default CreateBudget;