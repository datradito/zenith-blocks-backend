import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Container from "../Container/Container";
import { Typography } from "@mui/material";
import useProposalStore from "../../../store/modules/proposal/index.ts";

const exclude = ["Invoice", "Date", "Due"];

const SubItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  flexDirection: "column",
  textAlign: "left",
  boxShadow: "none",
}));

function ItemCard({ label, value }) {
  return !exclude.includes(label) ? (
    <SubItem key={label}>
      <Typography variant="subtitle1" gutterBottom>
        {label.toUpperCase()}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {value}
      </Typography>
    </SubItem>
  ) : null;
}

const ItemCardComponent = () => {
  const currentProposal = useProposalStore((state) => state.currentProposal);

  // if (currentProposal !== null) {
  //   const { id } = currentProposal;
  //   // rest of your code
  // } else {
  //   // handle the case where currentProposal is null
  // }
  const { id, description, ...rest } = currentProposal;

  return (
    <Container direction={"row"}>
      {Object.entries(rest)
        .reverse()
        .map(([key, value]) =>
          value ? <ItemCard key={key} label={key} value={value} /> : null
        )}
    </Container>
  );
};

ItemCardComponent.ItemCard = ItemCard;

export default ItemCardComponent;
