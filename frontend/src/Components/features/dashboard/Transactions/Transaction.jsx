import React from "react";
import StatusChip from "../../../atoms/StatusChip/StatusChip";
import styled from "styled-components";
import { useWaitForTransaction } from "wagmi";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import GetEnsName from "../../../molecules/GetEnsName/GetEnsName";
import Container from "../../../atoms/Container/Container";
import CircularIndeterminate from "../../../atoms/Loader/loader";
import { Typography } from "@mui/material";

const Transaction = ({ transaction }) => {
  const { data, isLoading } = useWaitForTransaction({
    hash: "0x487de32c3c7ccfd304831df9ab9d5219501eee8bdd09988dc62a73ac9dc38c6a",
  });

  return (
    <Container
      flexDirection={"row"}
      gap="1rem"
      margin="0"
      border="none"
      alignItems={"center"}
    >
      {isLoading ? (
        <CircularIndeterminate />
      ) : (
        <StatusChip status={data.status} />
      )}

      <Container
        border="none"
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        margin="0"
      >
        <Container flexDirection={"row"} border="none" margin="0" padding="0">
          <GetEnsName address={transaction.from} />
          <ArrowRightAltIcon />
          <GetEnsName address={transaction.to} />
        </Container>
        <Container flexDirection={"row"} border="none" margin="0" padding="0">
          <Typography variant="subtitle2">
            {transaction?.value?.toFixed(4)}
          </Typography>
          <Typography variant="subtitle1">{transaction.asset}</Typography>
        </Container>
      </Container>
    </Container>
  );
};

export default React.memo(Transaction);
