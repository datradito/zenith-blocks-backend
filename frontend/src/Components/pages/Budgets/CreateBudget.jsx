import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Box } from '@mui/material';
import useStyles from "./CreateBudget.style";
import * as yup from 'yup';
import FormItem from "../../atoms/FormItem/FormItem";
import FormRow from "../../molecules/Form/index";
import ButtonAtom from '../../atoms/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
        ml: "0.5rem"
      }
    ];

  const componentStyles = {
    backArrowSvgStyle: {
      color: 'white', 
      fontSize: "large",
      '& .MuiSvgIcon-root': {
        mr: '0.5rem',
      }
    }
  }


  return (
    <div>
      <Box style={{
        width: '90%',
        margin: '1rem auto',
      }}>
        <Typography variant='caption' style={{ color: 'white' }}>
          Budget
        </Typography>
        <Grid
          container
          style={{ justifyContent: 'space-between', alignItems: 'center', width: "100%" }}
        >
          <Grid>
            <Typography variant="h5" style={{ color: 'white' }}>
              <ArrowBackIcon sx={componentStyles.backArrowSvgStyle} />
              Back To Proposal
            </Typography>
          </Grid>
          <Grid
            item
            spacing='10'
          >
          {
            Object.keys(componentButtonConfig).map((key,index) => {
              return <ButtonAtom
                    key={key}
                    config={componentButtonConfig[key]}
                  />
            })
            }
            </Grid>
        </Grid>
      </Box>
      <div className={classes.BoxStyle}>
        <FormItem initialValues={dataForItemCard} />
        <FormRow />
      </div>
    </div>
  )
}

export default CreateBudget;