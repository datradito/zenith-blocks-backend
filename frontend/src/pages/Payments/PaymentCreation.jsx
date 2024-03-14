import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useAccount, useEnsName } from "wagmi";
import { SendTransaction } from "../../Components/features/payments/SendTransaction";
// We don't need to declare client here, just use useQuery ;)
import { client } from "../../config/apolloConfig/client";
import { GET_INVOICE_BY_ID } from "../../model/invoices/query";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import TransactionInfo from "../../Components/features/payments/TransactionInfo";
import Container from "../../Components/atoms/Container/Container";

import Label from "../../Components/atoms/Label/Label";
import PaymentBillingBanner from "../../Components/features/payments/PaymentBillingBanner";
import BillList from "../../Components/features/payments/BillList";
import PaymentSubHeader from "../../Components/features/payments/PaymentSubHeader";

import styled from "styled-components";

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

export const paymentLoader = async (invoiceId) => {
  //We don't need to declare client here, just use useQuery ;)
  const { loading, error, data, refetch } = await client.query({
    query: GET_INVOICE_BY_ID,
    variables: { id: invoiceId },
  });

  return { loading, error, data, refetch };
};

function PaymentCreation() {
  const [paymentData, setPaymentData] = React.useState(null);
  const { isConnected } = useAccount();
  const { address } = useAccount();
  const { ensName } = useEnsName(address);

  const { proposal } = useSelector((state) => state.currentProposal);

  const { data, error, loading, refetch } = useLoaderData();

  useEffect(() => {
    if (data?.getInvoiceById) {
      setPaymentData(data.getInvoiceById);
    }
  }, [data]);

  return (
    <div>
      <PaymentSubHeader />
      <Container
        border="none"
        gap="1.5rem"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <RightPanel>
          <Typography variant="subtitle1" gutterBottom>
            Invoice <span>#{data.getInvoiceById.number}</span>
          </Typography>
          <Typography sx={{ color: "grey" }} variant="caption" gutterBottom>
            Issued on:{" "}
            {new Date(parseInt(data.getInvoiceById.date)).toLocaleDateString()}{" "}
            - Due on:{" "}
            {new Date(
              parseInt(data.getInvoiceById.duedate)
            ).toLocaleDateString()}
          </Typography>
          <PaymentBillingBanner
            payeeEnsName={ensName}
            paymentData={data.getInvoiceById}
          />
          <Label>Proposal</Label>
          <Typography variant="subtitle1" gutterBottom>
            {proposal?.title || "Error loading proposal title. Please refresh."}
          </Typography>
          <Label>Description</Label>
          <Typography variant="subtitle1" gutterBottom>
            {data.getInvoiceById.description}
          </Typography>
          <BillList />
        </RightPanel>
        <LeftPanel>
          {isConnected && (
            <SendTransaction
              reciepent={paymentData?.recipient}
              paymentData={data?.getInvoiceById}
            />
          )}
        </LeftPanel>
      </Container>
    </div>
  );
}

export default PaymentCreation;