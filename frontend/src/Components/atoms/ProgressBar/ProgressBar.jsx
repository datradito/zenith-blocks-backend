import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'grey' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

// Inspired by the former Facebook spinners.


export default function CustomizedProgressBars({ value }) {


    return (
      <Box
        sx={{
          flexGrow: 1,
          textAlign: "center",
          width: "80%",
        }}
      >
        <Typography variant="caption">
          {" "}
          {value.toFixed(2)} %{" "}
        </Typography>
        <BorderLinearProgress variant="determinate" value={value} />
      </Box>
    );
}
