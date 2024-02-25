import React from "react";
import StatusChip from "../../../atoms/StatusChip/StatusChip";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import GetEnsName from "../../../molecules/GetEnsName/GetEnsName";
import Container from "../../../atoms/Container/Container";
import { Typography } from "@mui/material";
import Table from "../../../molecules/Table/Table";

const Transaction = ({ transaction }) => {

  console.log(transaction);
  return (
    <Table.Row>
      <StatusChip status={transaction.status} type="payment" />

      <Container
        border="none"
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        margin="0"
      >
        <Container
          flexDirection={"row"}
          border="none"
          margin="0"
          padding="0"
          alignItems={"center"}
        >
          <GetEnsName address={transaction?.from} />
          <ArrowRightAltIcon />
          <GetEnsName address={transaction?.to} />
        </Container>
        {transaction?.tokenInfo !== undefined ? (
          <Container
            flexDirection={"row"}
            border="none"
            margin="0"
            padding="0"
            alignItems={"center"}
          >
            {/* <Avatar size={24} src={transaction?.tokenInfo?.logoURI} /> */}
            <Typography>
              {transaction?.tokenInfo?.value /
                Math.pow(10, transaction?.tokenInfo?.decimals)}
            </Typography>
            <Typography variant="subtitle1">
              {transaction.tokenInfo?.symbol}
            </Typography>
          </Container>
        ) : (
            null
        )}
      </Container>
    </Table.Row>
  );
};

export default React.memo(Transaction);
