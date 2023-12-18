import React, { useEffect } from 'react'
import {Typography} from '@mui/material'
import { useAccount, useEnsName } from 'wagmi';
import { SendTransaction } from './SendTransaction';
import { client } from '../../../apolloConfig/client';
import { GET_INVOICE_BY_ID } from '../../../ServerQueries/Invoices/Queries';
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TransactionInfo from "./TransactionInfo";
import List from '../../atoms/List/List';
import Container from '../../atoms/Container/Container';

import Label from '../../atoms/Label/Label';
import PaymentBillingBanner from './PaymentBillingBanner';



export const paymentLoader = async (invoiceId) => {
    const { loading, error, data, refetch } = await client.query({
    query: GET_INVOICE_BY_ID,
    variables: { id: invoiceId },
    });

    return { loading, error, data, refetch };
}

function PaymentCreation() {
    const [ paymentData, setPaymentData ] = React.useState(null);
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

    const dataForItemCard = {
      Payee: paymentData?.payee || address,
      Receipient: ensName || paymentData?.recipient,
      Budget:
        "Budget [BIP-392] Enable a new BRZ-jBRL Stable Pool Gauge | 2% cap (Polygon)",
      Proposal:
        proposal?.title || "Error loading proposal title. Please refresh.",
      Invoice: paymentData?.number,
      Date: new Date(parseInt(paymentData?.date)).toLocaleDateString(),
      Due: new Date(parseInt(paymentData?.duedate)).toLocaleDateString(),
      Total: paymentData?.total,
    };


    const handlePaymentCreateOnClick = (hash) => {
        console.log(hash)
    }


    return (
      <Container sx={{ paddingTop: "1rem", margin: 0 }}>
        <List
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1.5rem",
          }}
        >
          <Container
            style={{
              backgroundColor: "rgba(40, 42, 46, 0.2)",
              padding: "2rem",
              width: "45%",
              marginLeft: "0",
              textAlign: "left",
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Invoice <span>#{dataForItemCard.Invoice}</span>
            </Typography>
            <Typography sx={{ color: "grey" }} variant="caption" gutterBottom>
              Issued on: {dataForItemCard.Date} - Due on: {dataForItemCard.Due}
            </Typography>
            <PaymentBillingBanner />
            <Label>Proposal</Label>
            <Typography
              style={{
                fontSize: ".85rem",
                padding: ".25rem 0",
                color: "white",
              }}
            >
              {proposal?.title ||
                "Error loading proposal title. Please refresh."}
            </Typography>
          </Container>
          <Container
            style={{
              backgroundColor: "rgba(40, 42, 46, 0.2)",
              padding: "2rem",
              width: "35%",
              textAlign: "left",
            }}
          >
            {isConnected && (
              <SendTransaction
                handlePaymentCreateOnClick={handlePaymentCreateOnClick}
                reciepent={paymentData?.recipient}
                paymentData={paymentData}
              />
            )}
          </Container>
        </List>
        <TransactionInfo />
      </Container>
    );
}

export default PaymentCreation