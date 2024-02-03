import React from "react";
import StatusChip from "../../../atoms/StatusChip/StatusChip";
import styled from "styled-components";
import { useWaitForTransaction } from "wagmi";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Label from "../../../atoms/Label/Label";
import ListItem from "../../../atoms/ListItem/ListItem";
import List from "../../../atoms/List/List";
import GetEnsName from "../../../molecules/GetEnsName/GetEnsName";
import Container from "../../../atoms/Container/Container";
import CircularIndeterminate from "../../../atoms/Loader/loader";


const StyledTransactionList = styled(List)`
  padding: 0;
  margin: 0;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const TransactionBanner = styled(Container)`
  display: flex;
  gap: 1rem;
  align-items: center;
  border: none;
`;



const Transaction = ({ transaction }) => {
  const { data, isLoading } = useWaitForTransaction({
    hash: "0x487de32c3c7ccfd304831df9ab9d5219501eee8bdd09988dc62a73ac9dc38c6a",
  });


  return (
    <TransactionBanner>
      {isLoading ? (
        <CircularIndeterminate />
      ) : (
        <StatusChip status={data.status} />
      )}

      <ListItem
        style={{
          padding: "0",
          margin: "0",
        }}
      >
        <StyledTransactionList>
          <GetEnsName address={transaction.from} />
          <ArrowRightAltIcon fontSize="0.75rem" />
          <GetEnsName address={transaction.to} />
        </StyledTransactionList>
        <StyledTransactionList>
          <Label color="white">{transaction.value.toFixed(4)}</Label>
          <Label>:{transaction.asset}</Label>
        </StyledTransactionList>
      </ListItem>
    </TransactionBanner>
  );
};

export default React.memo(Transaction);
