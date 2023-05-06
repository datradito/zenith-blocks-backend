import React from 'react'
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Grid, Typography} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
 
  },
  governance: {
    fontWeight: 'bold',
  },
  totalBudget: {
    fontWeight: 'bold',
  },
  proposal: {
  },
}));

function CreateBudget() {
  const proposal = useSelector(state => state);
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" className={classes.governance}>
          Governance
        </Typography>
        <Typography>Example governance text</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" className={classes.totalBudget}>
          Total Budget
        </Typography>
        <Typography>$100,000</Typography>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.proposal}>
        <Typography variant="h6">Proposal</Typography>
        <Typography>Example proposal text</Typography>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.proposal}>
        <Typography variant="h6">Link</Typography>
        <Typography>http://example.com</Typography>
      </Grid>
    </Grid>
  )
}

export default CreateBudget;