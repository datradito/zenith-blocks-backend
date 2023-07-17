import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ButtonAtom from '../../atoms/Button';
import { Box, Stack, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ModalDialog from '../DialogBox/dialogBox';

function SubHeader({ buttonConfig, currentPath, previousPath }) {
    
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
      <Box style={{
          width: '90%',
          margin: '1rem auto',
      }}>
          <Typography variant='caption' style={{ color: 'white' }}>
              {previousPath}
          </Typography>
          <Grid
              container
              style={{ justifyContent: 'space-between', alignItems: 'center', width: "100%" }}
          >
              <Grid>
                  <Link to={currentPath.to} style={{ textDecoration: 'none' }}>
                      <Typography variant="h5" style={{ color: 'white' }}>
                          <ArrowBackIcon sx={componentStyles.backArrowSvgStyle} />
                          {currentPath.path}
                      </Typography>
                  </Link>
              </Grid>
              <Grid>
                  {
                      Object.keys(buttonConfig).map((key, index) => {
                          return buttonConfig[key].type && buttonConfig[key].type === 'link' && buttonConfig[key].to !== "" ? 
                                <Link to={buttonConfig[key].to} key={index}>
                                  {/* <ButtonAtom
                                      config={buttonConfig[key]}
                                  /> */}
                                  <ModalDialog buttonConfig={buttonConfig[key]}/>
                                </Link>
                              : buttonConfig[key].subButton ?
                                <ModalDialog key={index} buttonConfig={buttonConfig[key]} /> :
                                <ButtonAtom
                                        key={index}
                                        config={buttonConfig[key]}
                                />
                      })
                  }
              </Grid>
          </Grid>
      </Box>
  )
}

export default SubHeader