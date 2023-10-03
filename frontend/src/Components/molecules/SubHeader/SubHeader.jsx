import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ButtonGroup from '../ButtonGroup/ButtonGroup';

const componentStyles = {
    backArrowSvgStyle: {
    color: "white",
    fontSize: "large",
    "& .MuiSvgIcon-root": {
        mr: "0.5rem",
    },
    },
};

function SubHeader({ buttonConfig, currentPath, previousPath }) {

  return (
    <Box
      style={{
        width: "90%",
        margin: "1rem auto",
      }}
    >
      <Typography variant="caption" style={{ color: "white" }}>
        {previousPath}
      </Typography>
      <Grid
        container
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <Grid>
          <Link to={currentPath.to} style={{ textDecoration: "none" }}>
            <Typography variant="h5" style={{ color: "white" }}>
              <ArrowBackIcon sx={componentStyles.backArrowSvgStyle} />
              {currentPath.path}
            </Typography>
          </Link>
        </Grid>
        <Grid>
          {buttonConfig.map((button, index) => {
            return <ButtonGroup buttonConfig={button} key={index} />;
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

export default SubHeader