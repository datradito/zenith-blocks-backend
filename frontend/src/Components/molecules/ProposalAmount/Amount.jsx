import React from "react";
import { useDispatch } from "react-redux";
import { addAmount } from "../../../actions/currentProposal/amount.js";
import useGetProposalAmount from "../../hooks/Proposals/useGetProposalAmount.jsx";
import Box from "@mui/material/Box";
import CircularIndeterminate from "../../atoms/Loader/loader.jsx";
import CustomActionIcon from "../../atoms/ActionIcon/CustomActionIcon.jsx";
import Modal from "../Modal/Modal.jsx";
import FormDetailPanel from "../../atoms/EditDetails/EditDetailsProposal.jsx";
import { Typography } from "@mui/material";

export default function Amount({ row }) {
  const dispatch = useDispatch();

  const { amount, status, proposalLoading, refetch } = useGetProposalAmount(row.id);

  if (amount) {
    dispatch(
      addAmount({ amount: amount, proposalId: row.id, status: status })
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
      {amount !== null ? (
        <Typography variant="body2">{amount}</Typography>
      ) : (
        <>
          <Modal>
            <Modal.Open opens="editAmount">
              <CustomActionIcon />
            </Modal.Open>

            <Modal.Window name="editAmount">
                <FormDetailPanel
                  row={row}
                  refetch={refetch}
                />
            </Modal.Window>
          </Modal>
        </>
      )}
    </div>
  );
}
