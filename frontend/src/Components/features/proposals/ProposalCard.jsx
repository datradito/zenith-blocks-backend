import React from "react";
import Paper from "@mui/material/Paper";
import { Link, Typography, styled } from "@mui/material/";
import Amount from "../../molecules/ProposalAmount/Amount.jsx";
import LaunchIcon from "@mui/icons-material/Launch";
import Modal from "../../molecules/Modal/Modal.jsx";
import ProposalSnapShotView from "./ProposalSnapShotView.jsx";
const SubItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(0.5),
  textAlign: "left",
  color: theme.palette.text.primary,
  boxShadow: "none",
  
}));



function ProposalCard({ item }) {
  return (
    <>
      <SubItem>
        <Typography variant="subtitle1">
          Governance
        </Typography>
        <Typography variant="body2">{item.space.name}</Typography>
      </SubItem>
      <SubItem>
        <Typography variant="subtitle1">
          Total Budget
        </Typography>
        <Amount row={item} />
      </SubItem>
      <SubItem>
        <Typography variant="subtitle1">
          Proposal
          <Modal>
            <Modal.Open opens="proposalDetail">
              <LaunchIcon sx={{ color: "primary.main" }} />
            </Modal.Open>

            <Modal.Window name="proposalDetail">
              <ProposalSnapShotView data={item} />
            </Modal.Window>
          </Modal>
        </Typography>
        <Link
          color="inherit"
          href={`/proposals/${item.id}/budgets`}
        >
          <Typography variant="body2">{item.title}</Typography>
        </Link>
      </SubItem>
    </>
  );
}


const ProposalCardMemo = React.memo(ProposalCard);
export default ProposalCardMemo;
