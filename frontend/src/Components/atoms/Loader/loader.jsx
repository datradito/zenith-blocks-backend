import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const StyledCircularIndeterminate = styled(Box)(() => ({
  width: "90%",
  margin: "0rem auto",
  textAlign: "center",
  color: "white",
  marginTop: "1rem",
  borderRadius: 3,
}));

export default function CircularIndeterminate() {
  return (
    <StyledCircularIndeterminate>
      <CircularProgress />
    </StyledCircularIndeterminate>
  );
}
