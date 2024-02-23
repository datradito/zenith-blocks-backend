import * as React from 'react';
import { NavLink } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import { useSelector } from 'react-redux';

import {
    AppBar,
  Toolbar,
  Button,
    Grid,
} from '@mui/material';

import logo from "../../../Images/logo.png"

const navLinkStyle = {
    textDecoration: "none",
    color: "white"
}


//test function to create a user
// const createUser = () => {  
//   axios
//     .post(`${process.env.REACT_APP_API_URL}/createUser`, {
//       address: "0x1234",
//       daoId: "eth.balancer",
//     })
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
const ResponsiveHeaderBar = () => {
    let { proposal } = useSelector(state => state.currentProposal);
    let { Budget } = useSelector(state => state.currentBudget);
    let pages = [];

    proposal ? pages.push(
        { name: 'Proposals', url: '/proposals' },
        { name: 'Swap', url: '/swap' },
        { name: 'Dashboard', url: '/dashboard' }) : Budget ?
            pages.push(
                { name: 'Invoices', url: `/proposals/${proposal.id}/invoices` },
                { name: 'Proposals', url: '/proposals' },
                { name: 'Accounts', url: '/accounts' }
            ) : pages.push({ name: 'Proposals', url: '/proposals'});

    return (
      <AppBar
        position="static"
        color="transparent"
      >
          <Toolbar disableGutters>
              <img style={{ maxWidth: "8rem" }} src={logo} alt="Logo" />
            <>
              <Grid sx={{
                flexGrow: 1
              }}>
                {pages.map((page, index) => (
                  <Button key={index}>
                    <NavLink
                      style={navLinkStyle}
                      to={page.url}
                      key={page.name}
                      sx={{
                        color: "white",
                        textTransform: "capitalize",
                        display: "block",
                      }}
                    >
                      {page.name}
                    </NavLink>
                  </Button>
                ))}
              </Grid>
              <Grid sx={{ flexGrow: 0 }}>
                <WalletConnect />
              </Grid>
            </>
          </Toolbar>
      </AppBar>
    );
}

export default ResponsiveHeaderBar;