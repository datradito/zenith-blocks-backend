import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useAccount, useEnsName } from "wagmi";
import { SendTransaction } from "./SendTransaction";
import { client } from "../../../apolloConfig/client";
import { GET_INVOICE_BY_ID } from "../../../ServerQueries/Invoices/Queries";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import TransactionInfo from "./TransactionInfo";
import Container from "../../atoms/Container/Container";
import styled from "styled-components";

import Label from "../../atoms/Label/Label";
import PaymentBillingBanner from "./PaymentBillingBanner";
import BillList from "../../features/payments/BillList";
import PaymentSubHeader from "./PaymentSubHeader";

const PanelContainer = styled(Container)`
  display: flex;
  border: none;
  gap: 1.5rem;
  margin-bottom: 4rem;
  border-box: box-sizing;
`;

const RightPanel = styled(Container)`
  background-color: rgba(40, 42, 46, 0.2);
  padding: 2rem;
  flex: 3;
  text-align: left;
`;

const LeftPanel = styled(Container)`
  background-color: rgba(40, 42, 46, 0.2);
  padding: 2rem;
  flex: 1;
  text-align: left;
`;

export const paymentLoader = async (invoiceId) => {
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
    <>
      <PaymentSubHeader />
      <PanelContainer>
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
          <Label
          >Description</Label>
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
      </PanelContainer>
    </>
  );
}

export default PaymentCreation;
