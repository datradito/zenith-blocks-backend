import React from "react";

import useGetProposalAmount from "../../hooks/Proposals/useGetProposalAmount.jsx";
import Box from "@mui/material/Box";
import CircularIndeterminate from "../../atoms/Loader/loader.jsx";
import CustomActionIcon from "../../atoms/ActionIcon/CustomActionIcon.jsx";
import Modal from "../../molecules/Modal/Modal.jsx";
import FormDetailPanel from "./EditDetailsProposal.jsx";
import { Typography } from "@mui/material";

export default function Amount({ row }) {
  const { amount, proposalLoading, refetch } = useGetProposalAmount(row.id);

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
      {amount !== null ? (
        <Typography variant="body2">{amount}</Typography>
      ) : (
        <>
          <Modal>
            <Modal.Open opens="editAmount">
              <CustomActionIcon />
            </Modal.Open>

            <Modal.Window name="editAmount">
              <FormDetailPanel row={row} refetch={refetch} />
            </Modal.Window>
          </Modal>
        </>
      )}
    </div>
  );
}
