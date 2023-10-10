import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import FormDetailPanel from "../../atoms/EditDetails/EditDetailsProposal.jsx";
import Amount from "../../molecules/ProposalAmount/Amount.jsx";

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

function ProposalCard({
  item,
  selectedItemId,
  handleTotalBudgetClick,
  onClose,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAmountAdded, setIsAmountAdded] = useState(false);
  return (
    <>
      <SubItem sx={subItemStyle}>
        <ColumnItem sx={label}>Governance</ColumnItem>
        <ColumnItem>{item.space.name}</ColumnItem>
      </SubItem>
      <SubItem
        sx={subItemStyle}
        // onClick={() => handleTotalBudgetClick(item.id)}
      >
        <ColumnItem sx={label}>Total Budget</ColumnItem>
        <ColumnItem>
          {selectedItem === item.id && (
            <FormDetailPanel
              row={item}
              onClose={onClose}
              setIsAmountAdded={setIsAmountAdded}
            />
          )}
          {(isAmountAdded || selectedItem !== item.id) && (
            <>
              <Amount
                proposalid={item.id}
                key={selectedItemId}
                onClick={() => setSelectedItem(item.id)}
              />
            </>
          )}
        </ColumnItem>
      </SubItem>
      <SubItem>
        <Link to={`/proposals/${item.id}/budgets`} style={{ textDecoration: "none" }}>
          <ColumnItem sx={label}>Proposal</ColumnItem>
          <ColumnItem>{item.title}</ColumnItem>
        </Link>
      </SubItem>
    </>
  );
}

export default ProposalCard;
