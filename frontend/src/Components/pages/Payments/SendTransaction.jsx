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

export function SendTransaction({ handlePaymentCreateOnClick, reciepent }) {
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
      <Typography variant="h6" sx={componentStyles.typographyLabel}>
        Recipient
      </Typography>
      <TextField
        name="Recipient"
        required
        value={to}
        type="text"
        onChange={(e) => setTo(e.target.value)}
        fullWidth
        sx={componentStyles.formInputFieldStyles}
      />
      <Typography variant="h6" sx={componentStyles.typographyLabel}>
        Amount
      </Typography>
      <TextField
        name="Amount"
        required
        value={amount}
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        sx={componentStyles.formInputFieldStyles}
      />
      <Button
        sx={{
          backgroundColor: "#055FFC",
          margin: "1rem 0",
          borderRadius: "50px",
          fontSize: ".85rem",
          textTransform: "none",
          maxWidth: "10rem",
          color: "white",
        }}
        onClick={handlePayment}
        disabled={isLoading || !sendTransaction || !to || !amount}
      >
        {isLoading ? "Sending..." : "Pay Invoice"}
      </Button>
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
