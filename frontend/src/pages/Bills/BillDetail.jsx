import React from "react";
import { Typography } from "@mui/material";
import Container from "../../Components/atoms/Container/Container";

import Label from "../../Components/atoms/Label/Label";
import BillList from "../../Components/features/payments/BillList";

import styled from "styled-components";
import DetailBillingInfo from "../../Components/features/bills/Detail/DetailBillingInfo";
import Payment from "../Payments/Payment";

const RightPanel = styled(Container)`
  padding: 1rem;
  flex: 2;
  text-align: left;
`;

const LeftPanel = styled(Container)`
  padding: 1rem;
  flex: 1;
  text-align: left;
`;

function BillDetail({ bill }) {
  return (
    <div>
      <Container
        border="none"
        gap="1.5rem"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <RightPanel>
          <Typography variant="subtitle1">
            Invoice <span>#{bill.Invoice}</span>
          </Typography>
          <Typography sx={{ color: "grey" }} variant="caption" gutterBottom>
            Issued on: {bill.Date} - Due on: {bill.Due}
          </Typography>
          <DetailBillingInfo bill={bill} />
          {/* <Label>Proposal</Label> */}
          {/* <Typography variant="subtitle1" gutterBottom>
            {proposal?.title || "Error loading proposal title. Please refresh."}
          </Typography> */}
          <Label>Description</Label>
          <Typography variant="subtitle1" gutterBottom>
            {bill.Description}
          </Typography>
          <BillList bill={bill} />
        </RightPanel>
        <LeftPanel>
          <Payment txHash={bill.transactionHash} />
        </LeftPanel>
      </Container>
    </div>
  );
}

export default BillDetail;
