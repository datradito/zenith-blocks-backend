import React, {useState, useEffect} from 'react'
import { useDebounce } from 'use-debounce'
import {
    usePrepareSendTransaction,
    useSendTransaction,
    useWaitForTransaction,
} from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@mui/material'
import { TextField, Typography, Box } from '@mui/material'
import CircularIndeterminate from '../../atoms/Loader/loader'
import SubHeader from '../../molecules/SubHeader/SubHeader'
import Label from '../../atoms/Label/Label'
import Input from '../../atoms/Input/Input'
import { Divider } from "@mui/material";


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

export function SendTransaction({ handlePaymentCreateOnClick, reciepent, paymentData }) {
  const [to, setTo] = useState("");
  const [debouncedTo] = useDebounce(to, 500);

  const [amount, setAmount] = useState("");
  const [debouncedAmount] = useDebounce(amount, 500);

  const { config, error: prepareTransactinoError } = usePrepareSendTransaction({
    to: debouncedTo,
    value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
  });
  const { data, sendTransaction } = useSendTransaction(config);

  useEffect(() => {
    setTo(reciepent);
  }, [reciepent]);


  const { isLoading, isSuccess, isError, error } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      handlePaymentCreateOnClick(data?.hash);
    },
    onError(error) {
      console.log(error);
    },
  });

  const handlePayment = (e) => {
    e.preventDefault();
    sendTransaction?.();
  };

  if (isLoading) return <div>Processing…</div>;
  if (isError) return <div>${error}</div>;
  if (prepareTransactinoError) {
    const error = JSON.parse(JSON.stringify(prepareTransactinoError));
    throw Error(error.shortMessage);
  };

  return (
    <form
      onSubmit={(e) => {
        handlePayment(e);
      }}
    >
      <Label>Payee</Label>
      <Input
        type="text"
        id="payee"
        defaultValue={paymentData?.owneraddress}
        readOnly
        // {...methods.register("payee", {
        //   required: "Payee is required",
        // })}
      />

      <Label> Currency</Label>
      <Input
        type="text"
        id="currency"
        defaultValue={paymentData?.currency}
        readOnly
        // {...methods.register("currency", {
        //   required: "Currency is required",
        // })}
      />

      <Divider
        sx={{
          height: 28,
          m: 1,
          color: "white",
        }}
        orientation="horizontal"
      />
      <Label>Recipient</Label>
      <Input
        type="text"
        id="recipient"
        defaultValue={paymentData?.recipient}
        // {...methods.register("recipient", {
        //   required: "Reciepient is required",
        // })}
      />
      <Label>Amount</Label>
      <Input
        type="number"
        id="amount"
        defaultValue={paymentData?.amount}
        readOnly
        // {...methods.register("amount", {
        //   required: "Amount is required",
        // })}
      />

      <Divider
        sx={{
          height: 28,
          m: 1,
          color: "white",
        }}
        orientation="horizontal"
      />

      <>
        <SubHeader.ActionButton
          onClick={handlePayment}
          disabled={isLoading || !sendTransaction || !to || !amount}
          label={isLoading ? "Sending..." : "Pay Invoice"}
        />
      </>

      {isLoading ? (
        <CircularIndeterminate />
      ) : isSuccess ? (
        <Box>
          Successfully sent {amount} ether to {to}
          <Box>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </Box>
        </Box>
      ) : null}
    </form>
  );
}
