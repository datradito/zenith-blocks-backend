import * as React from "react";
import { NavLink } from "react-router-dom";
import WalletConnect from "./WalletConnect.jsx";

import { AppBar, Toolbar, Button, Grid } from "@mui/material";

import logo from "../../../assets/Images/logo.png";
import useProposalStore from "../../../store/modules/proposal/index.ts";

const navLinkStyle = {
  textDecoration: "none",
  color: "white",
};

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

  let pages = [
    { name: "Proposals", url: "/proposals" },
    { name: "Swap", url: "/swap" },
    { name: "Bills", url: "/bills/misc" },
    { name: "Dashboard", url: "/dashboard" },
  ];


  return (
    <AppBar position="static" color="transparent">
      <Toolbar disableGutters>
        <img style={{ maxWidth: "8rem" }} src={logo} alt="Logo" />
        <>
          <Grid
            sx={{
              flexGrow: 1,
            }}
          >
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
};

export default ResponsiveHeaderBar;
