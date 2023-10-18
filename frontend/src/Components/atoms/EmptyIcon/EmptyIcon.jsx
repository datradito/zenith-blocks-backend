import * as React from "react";
import Box from "@mui/material/Box";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Typography } from "@mui/material";

const FileIconStyles = {
  padding: "1.5rem",
  fontSize: "5rem",
    borderRadius: "50%",
  border: ".05rem #272A30 solid",
  "& .MuiSvgIcon-root": {
    fontSize: "5rem",
  },
};

export default function EmptyIcon() {
  return (
    <Box
      sx={{
              m: "5rem",
      }}
    >
          <DescriptionOutlinedIcon
              variant="filled"
              sx={FileIconStyles}
          />
          <Typography variant="h6" sx={{
              textAlign: "center",
              mt: "1rem",
                fontSize: "1rem",
          }}>
              This table doesn't have any transactions
          </Typography>
          <Typography variant="body2" sx={{
              textAlign: "center",
              mt: "0.5rem",
              fontSize: "0.85rem",
                color: "grey"
          }}>
              Add a transaction to see it here
            </Typography>
    </Box>
  );
}
