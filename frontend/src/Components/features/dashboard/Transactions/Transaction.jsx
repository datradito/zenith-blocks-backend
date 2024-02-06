import React from "react";
import StatusChip from "../../../atoms/StatusChip/StatusChip";
import styled from "styled-components";
import { useWaitForTransaction } from "wagmi";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ListItem from "../../../atoms/ListItem/ListItem";
import GetEnsName from "../../../molecules/GetEnsName/GetEnsName";
import Container from "../../../atoms/Container/Container";
import CircularIndeterminate from "../../../atoms/Loader/loader";
import { Stack, Typography } from "@mui/material";

const StyledTransactionList = styled(Stack)`
  border: none;
  flex-direction: row;
  align-items: center;
  margin: 0;
`;

const TransactionBanner = styled(Container)`
  gap: 1rem;
  border: none;
  align-items: center;
  flex-direction: row;
  margin: 0;
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

      <Stack border="none" margin="0">
        <StyledTransactionList>
          <GetEnsName address={transaction.from} />
          <ArrowRightAltIcon  />
          <GetEnsName address={transaction.to} />
        </StyledTransactionList>
        <StyledTransactionList>
          <Typography variant="subtitle2">
            {transaction?.value?.toFixed(4)}
          </Typography>
          <Typography variant="subtitle1">{transaction.asset}</Typography>
        </StyledTransactionList>
      </Stack>
    </TransactionBanner>
  );
};

export default React.memo(Transaction);
