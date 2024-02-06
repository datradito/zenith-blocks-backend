import React from "react";
import { Typography, Button, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import logo from "../../../Images/logo.png";

const stackStyles = {
  direction: { xs: "column", sm: "row" },
  gap: 2,
  alignItems: "center",
  justifyContent: "center",
  height: { sm: "50vh" },
  border: "none",
  margin: 4,
};

export default function Login() {
  return (
    <Stack {...stackStyles}>
      <Stack alignItems={{ xs: "center", sm: "left" }} border={"none"}>
        <p>
          <img style={{ maxWidth: "8rem" }} src={logo} alt="Logo" />
        </p>
        <Typography variant="h3">FOR DAO | BY DAO </Typography>
        <Typography variant="subtitle1">
          ZenithBlocks is a platform for DAOs to manage their treasury and
          governance
        </Typography>
      </Stack>
      <Divider orientation="vertical" flexItem color="gray" />
      <Stack
        alignItems={{ xs: "center" }}
        spacing={2}
        border={"none"}
      >
        <Typography variant="h4">Welcome to Zenith Blocks</Typography>
        <Typography variant="h6">
          Please register to continue
        </Typography>

        <Link to="https://www.zenithblocks.com/#cta">
          <Button variant="contained" endIcon={<SendIcon />}>
            Register
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
}
