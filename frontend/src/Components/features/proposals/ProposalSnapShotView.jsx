import React from "react";
import { Box, Typography } from "@mui/material";
import Markdown from 'react-markdown'
import StatusChip from "../../atoms/StatusChip/StatusChip";
function ProposalSnapShotView({ data }) {

  console.log(data.state)
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "1rem",
        }}
      >
        <StatusChip status={data.state} />
      </Box>

      <Box
        sx={{
          height: "50vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          color: "white",
        }}
      >
        <Typography
          sx={{
            fontSize: ".75rem",
            borderRadius: 2,
            overflowWrap: "break-word",
          }}
        >
          <Markdown>{data.body}</Markdown>
        </Typography>
      </Box>
    </>
  );
}

export default ProposalSnapShotView;
