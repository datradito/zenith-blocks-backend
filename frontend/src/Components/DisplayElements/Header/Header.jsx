import * as React from 'react';
import { NavLink } from 'react-router-dom';
import WalletConnect from './WalletConnect';

import { useSelector } from 'react-redux';

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Container,
    Button,
} from '@mui/material';

import logo from "../../../Images/logo.png"

const navLinkStyle = {
    textDecoration: "none",
    color: "white"
}

const ResponsiveHeaderBar = () => {
    let { proposal } = useSelector(state => state.currentProposal);
    let { Budget } = useSelector(state => state.currentBudget);
    let pages = [];

    proposal ? pages.push(
        { name: 'Proposals', url: '/proposals' },
        { name: 'Accounts', url: '/accounts' },
        { name: 'Swap', url: '/swap' },
        { name: 'Dashboard', url: '/dashboard' }) : Budget ?
            pages.push(
                { name: 'Invoices', url: `/proposals/${proposal.id}/invoices` },
                { name: 'Proposals', url: '/proposals' },
                { name: 'Accounts', url: '/accounts' }
            ) : pages.push({ name: 'Proposals', url: '/proposals' },
        { name: 'Accounts', url: '/accounts' });

    return (
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#1A1C1E",
          fontFamily: "Fantasy",
          padding: ".5rem 2rem",
        }}
      >
        <Container
        >
          <Toolbar disableGutters>
              <img style={{ maxWidth: "8rem" }} src={logo} alt="Logo" />
            <>
              <Box sx={{
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
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <WalletConnect />
              </Box>
            </>
            {/* { !walletConnected &&  <Login />  } */}
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default ResponsiveHeaderBar;