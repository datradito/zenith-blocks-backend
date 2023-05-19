import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Stack } from '@mui/material';
import useStyles from "./CreateBudget.style";
import { makeStyles } from '@mui/styles';
import * as yup from 'yup';
import FormItem from "../../atoms/FormItem/FormItem";
import FormRow from "../../molecules/Form/index";
import { Formik, Form } from 'formik';


function CreateBudget() {
  let { proposal } = useSelector(state => state.currentProposal);
  const classes = useStyles();

  const [formData, setFormData] = React.useState({});

  let dataForItemCard = {};
  

  if (proposal) {
    dataForItemCard = { "Goverance": `${proposal.space.name}`, "Total Budget": "5,980,000", "Proposal": `${proposal.title}`, "Ipfs Link" : `${proposal.ipfs}`}
  }

  

  return (
    <div className={classes.BoxStyle}>
      <FormItem initialValues={dataForItemCard} />
      <FormRow />
    </div>
  )
}

export default CreateBudget;