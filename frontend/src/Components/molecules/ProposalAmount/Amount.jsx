import React from "react";
import { useDispatch } from "react-redux";
import { addAmount } from "../../../actions/currentProposal/amount.js";
import useGetProposalAmount from "../../hooks/Proposals/useGetProposalAmount.jsx";
import CustomActionIcon from "../../atoms/ActionIcon/CustomActionIcon.jsx";
import Box from "@mui/material/Box";
import CircularIndeterminate from "../../atoms/Loader/loader.jsx";

export default function Amount({ proposalid, onClick }) {
  const dispatch = useDispatch();

  const { amount, status, proposalLoading } = useGetProposalAmount(proposalid);

  // dispatch(addAmount({ amount: amount, proposalId: proposalId }));

  if (amount) {
    dispatch(
      addAmount({ amount: amount, proposalId: proposalid, status: status })
    );
  }

  if (proposalLoading)
    return (
      <Box
        sx={{
          maxWidth: "50px",
          textAlign: "left",
          maxHeight: "40px",
          marginTop: -2,
        }}
      >
        <CircularIndeterminate />
      </Box>
    );

  return (
    <div>
      {amount !== null ? amount : <CustomActionIcon onClick={onClick} />}
    </div>
  );
}
