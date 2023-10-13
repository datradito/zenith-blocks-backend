import React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Container from '../Container/Container';
import Label from '../Label/Label';
import useCurrentProposalDetail from '../../hooks/useCurrentProposalDetail';
import CircularIndeterminate from '../Loader/loader';

const exclude = ["Invoice", "Date", "Due"];

const SubItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A1C1E",
  padding: theme.spacing(1),
  margin: theme.spacing(0.5),
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  boxShadow: "none",
}));

function ItemCard({ label, value }) {
  return !exclude.includes(label) ? (
    <SubItem key={label}>
      <Label
        style={{
          fontSize: ".75rem",
        }}
      >
        {label}
      </Label>
      <Label
        style={{
          fontSize: ".85rem",
          padding: ".25rem 0",
          color: "white",
        }}
      >{value}
      </Label>
    </SubItem>
  ) : null;
}


const ItemCardComponent = () => {
  const { loading, data } = useCurrentProposalDetail();

    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "flex-start",
          direction: "row",
          padding: "1rem",
        }}
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
}


export default ItemCardComponent