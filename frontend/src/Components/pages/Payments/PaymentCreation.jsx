import React, { useEffect } from 'react'
import { Box, Stack, Typography, Grid, TextField } from '@mui/material'
import SubHeader from '../../molecules/SubHeader/SubHeader'
import ItemCard from '../../atoms/ItemCard/ItemCard';
import { useAccount, useEnsName } from 'wagmi';
import { SendTransaction } from './SendTransaction';
import { Divider } from '@mui/material';
import { client } from '../../../apolloConfig/client';
import { GET_INVOICE_BY_ID } from '../../../ServerQueries/Invoices/Queries';
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TransactionInfo from "./TransactionInfo";

const BoxStyle = {
    width: '90%',
    margin: '0rem auto',
    textAlign: "center",
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    color: 'white',
    borderRadius: 3
};
const currentPathConfig = {
  path: "Pay Invoice",
  to: `/proposals`,
};

const componentStyles = {
    formInputFieldStyles: {
        color: 'white',
        padding: '0',
        border: ".08rem #2c2c2c solid",
        borderRadius: '5px',
        backgroundColor: "rgba(40, 42, 46, 0.2)",
        margin: '0 0 1rem 0',

        '& .MuiInputBase-input': {
            padding: '0.5rem',
            color: 'white',
            borderRadius: '5px',
            fontSize: '.85rem',
            fontWeight: 'small',
        },

        '& .MuiInputBase-root': {
            padding: '0',
        },
        '& .MuiSvgIcon-root': {
            color: 'white',
        },
    },
    typographyLabel: {
        color: 'gray',
        fontSize: ".80rem",
        marginBottom: ".5rem",
    },
    boxStyles: {
        display: "flex",
        flexDirection: "column",
        margin: "0rem auto",
        textAlign: 'left',
        borderBottom: '.05rem #2C2C2C solid',
    },
    containerStyles: {
        padding: '2rem ',
    },

}

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

    const paymentBar = {
        "Payee": paymentData?.payee || address,
        "Currency": paymentData?.currency,
    }

    const handlePaymentCreateOnClick = (hash) => {
        console.log(hash)
    }

    const componentButtonConfig = {
    };

    return (
      <Box>
        <SubHeader
          buttonConfig={componentButtonConfig}
          currentPath={currentPathConfig}
          previousPath="Proposals  Proposal  Budget"
        />
        <Grid sx={BoxStyle} spacing={2}>
          <Box
            sx={{
              width: "68%",
              border: ".05rem #2c2c2c solid",
              borderRadius: 3,
              marginTop: "1rem",
              backgroundColor: "rgba(40, 42, 46, 0.2)",
              paddingBottom: "2rem",
            }}
          >
            <Box
              sx={{
                color: "white",
                textAlign: "left",
                margin: "1rem",
                paddingBottom: "2rem",
                borderBottom: ".05rem #2c2c2c solid",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Invoice <span>#{dataForItemCard.Invoice}</span>
              </Typography>
              <Typography sx={{ color: "grey" }} variant="caption" gutterBottom>
                Issued on: {dataForItemCard.Date} - Due on:{" "}
                {dataForItemCard.Due}
              </Typography>
            </Box>
            <Stack
              padding={1}
              direction={"row"}
              justifyContent={"flex-start"}
              borderBottom={".05rem #2c2c2c solid"}
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {Object.entries(dataForItemCard).map(([key, value]) => (
                <ItemCard key={key} label={key} value={value} />
              ))}
            </Stack>
          </Box>
          <Box
            sx={{
              width: "25%",
              border: ".05rem #2c2c2c solid",
              borderRadius: 3,
              marginTop: "1rem",
              backgroundColor: "rgba(40, 42, 46, 0.2)",
              padding: "2rem",
              textAlign: "left",
            }}
          >
            {Object.entries(paymentBar).map(([key, value]) => {
              return (
                <Box key={key}>
                  <Typography variant="h6" sx={componentStyles.typographyLabel}>
                    {key}
                  </Typography>
                  <TextField
                    name={key}
                    required
                    value={value}
                    type={key === "Amount" ? "number" : "text"}
                    fullWidth
                    InputProps={{
                      readOnly: key !== "Amount" ? true : false,
                    }}
                    sx={componentStyles.formInputFieldStyles}
                  />
                </Box>
              );
            })}
            <Divider
              sx={{
                height: 28,
                m: 1,
                color: "white",
              }}
              orientation="horizontal"
            />
            {isConnected && (
              <SendTransaction
                handlePaymentCreateOnClick={handlePaymentCreateOnClick}
                reciepent={paymentData?.recipient}
              />
            )}
          </Box>
        </Grid>
        <TransactionInfo />
      </Box>
    );
}

export default PaymentCreation