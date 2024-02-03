import React from "react";
import Typography from "@mui/material/Typography";
import Button from "../../atoms/Button/Button";
import List from "../../atoms/List/List";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import logo from "../../../Images/logo.png";


const listContainer = {
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  height: "100%",
  flexDirection: "row",
  margin: "6rem auto 0 auto",
  border: "2rem #2c2c2c solid",
  borderRadius: "5px",
  gap: "1rem",
    backgroundColor: "#101218",
    padding: "2rem",
    
};

const rightPanel = {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 1,
    height: "100%",
};

const leftPanel = {
    alignItems: "center",
    justifyContent: "space-between",
    flex: .5,
    height: "100%",
};

    

export default function Login() {
  return (
    <List {...listContainer}>
      <List {...rightPanel}>
        <p style={{ color: "white", fontSize: "1.2rem" }}>
          <img style={{ maxWidth: "8rem" }} src={logo} alt="Logo" />
        </p>
        <Typography variant="h4" component="div" color="#055FFC">
          FOR DAO | BY DAO{" "}
        </Typography>
        <p style={{ color: "white", fontSize: "1.2rem", marginTop: "1rem" }}>
          Please Connect your wallet <br />
          to start using ZenithBlocks{" "}
        </p>
      </List>
      <Divider orientation="vertical" flexItem color="gray" />
      <List {...leftPanel}>
        <p style={{ color: "white", fontSize: "0.8rem", textAlign: "center" }}>
          If you are new to ZenithBlocks Please get in touch with us, to get you
          set up with beta{" "}
        </p>
        <Link to="https://www.zenithblocks.com/#cta">
          <Button type="primary" style={{ marginTop: "1rem" }}>
            Register
          </Button>
        </Link>
      </List>
    </List>
  );
}
