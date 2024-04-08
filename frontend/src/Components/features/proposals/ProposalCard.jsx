import React from "react";
import Paper from "@mui/material/Paper";
import { Link, Typography, styled } from "@mui/material/";
import Amount from "./Amount.jsx";
import LaunchIcon from "@mui/icons-material/Launch";
import Modal from "../../molecules/Modal/Modal.jsx";
import ProposalSnapShotView from "./ProposalSnapShotView.jsx";

import useProposalStore from "../../../store/modules/proposal/index.ts";
import useGetProposalAmount from "../../hooks/Proposals/useGetProposalAmount.jsx";
import { NetworkStatus } from "@apollo/client";
import CircularIndeterminate from "../../atoms/Loader/loader.jsx";
const SubItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(0.5),
  textAlign: "left",
  color: theme.palette.text.primary,
  boxShadow: "none",
}));

function ProposalCard({ proposal }) {
  const { setCurrentProposal } = useProposalStore();

  const { refetch, status, amount, currency, networkStatus } =
    useGetProposalAmount(proposal.id);

  if (networkStatus === NetworkStatus.refetch) {
    <CircularIndeterminate />;
  }

  const prepareAndSetCurrentProposal = async (proposal) => {
    try {
      refetch(proposal.id);
      setCurrentProposal({
        id: proposal.id,
        status,
        amount,
        currency,
        title: proposal.title,
        space: proposal.space.name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SubItem>
        <Typography variant="subtitle1">Governance</Typography>
        <Typography variant="body2">{proposal.space.name}</Typography>
      </SubItem>
      <SubItem>
        <Typography variant="subtitle1">Total Budget</Typography>
        <Amount row={proposal} />
      </SubItem>
      <SubItem>
        <Typography variant="subtitle1">
          Proposal
          <Modal>
            <Modal.Open opens="proposalDetail">
              <LaunchIcon sx={{ color: "primary.main" }} />
            </Modal.Open>

            <Modal.Window name="proposalDetail">
              <ProposalSnapShotView data={proposal} />
            </Modal.Window>
          </Modal>
        </Typography>
        <Link
          onClick={() => prepareAndSetCurrentProposal(proposal)}
          color="inherit"
          href={`/proposals/${proposal.id}/budgets`}
        >
          <Typography variant="body2">{proposal.title}</Typography>
        </Link>
      </SubItem>
    </>
  );
}

const ProposalCardMemo = React.memo(ProposalCard);
export default ProposalCardMemo;
