import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Amount from "../../molecules/ProposalAmount/Amount.jsx";
import LaunchIcon from "@mui/icons-material/Launch";
import Modal from "../../molecules/Modal/Modal.jsx";
import ProposalSnapShotView from "./ProposalSnapShotView.jsx";
const SubItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A1C1E",
  padding: theme.spacing(1),
  margin: theme.spacing(0.5),
  textAlign: "left",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const ColumnItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A1C1E",
  textAlign: "left",
  color: "white",
  boxShadow: "none",
  fontSize: ".85rem",
}));

const subItemStyle = {
  minWidth: 200,
};

const label = {
  color: "Gray",
  fontSize: ".65rem",
};

function ProposalCard({ item }) {
  return (
    <>
      <SubItem sx={subItemStyle}>
        <ColumnItem sx={label}>Governance</ColumnItem>
        <ColumnItem>{item.space.name}</ColumnItem>
      </SubItem>
      <SubItem sx={subItemStyle}>
        <ColumnItem sx={label}>Total Budget</ColumnItem>
        <ColumnItem>
          <>
            <Amount row={item} />
          </>
        </ColumnItem>
      </SubItem>
      <SubItem>
        <ColumnItem sx={label}>
          Proposal
          <Modal>
            <Modal.Open opens="proposalDetail">
              <LaunchIcon sx={{ color: "#1A65C0", fontSize: "0.75rem" }} />
            </Modal.Open>

            <Modal.Window name="proposalDetail">
              <ProposalSnapShotView data={item} />
            </Modal.Window>
          </Modal>
        </ColumnItem>
        <Link
          to={`/proposals/${item.id}/budgets`}
          style={{ textDecoration: "none" }}
        >
          <ColumnItem>{item.title}</ColumnItem>
        </Link>
      </SubItem>
    </>
  );
}

export default ProposalCard;
