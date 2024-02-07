import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Container from "../Container/Container";
import useCurrentProposalDetail from "../../hooks/useCurrentProposalDetail";
import CircularIndeterminate from "../Loader/loader";
import { Typography } from "@mui/material";

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
        {label}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {value}
      </Typography>
    </SubItem>
  ) : null;
}

const ItemCardComponent = () => {
  const { loading, data } = useCurrentProposalDetail();

  return (
    <Container
      direction={"row"}
    >
      {loading ? (
        <CircularIndeterminate />
      ) : (
        Object.entries(data).map(([key, value]) => (
          <ItemCard key={key} label={key} value={value} />
        ))
      )}
    </Container>
  );
};

ItemCardComponent.ItemCard = ItemCard;

export default ItemCardComponent;
