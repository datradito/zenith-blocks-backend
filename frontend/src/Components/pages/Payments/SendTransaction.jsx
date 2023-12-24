import React, { useState, useEffect } from "react";
 

import { FormProvider, useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { parseEther } from "viem";
import CircularIndeterminate from "../../atoms/Loader/loader";
import SubHeader from "../../molecules/SubHeader/SubHeader";
import Input from "../../atoms/Input/Input";
import { Divider } from "@mui/material";
import Container from "../../atoms/Container/Container";
import Form from "../../atoms/Form/Form";
import FormRow from "../../atoms/FormRow/FormRow";
import { message } from "antd";

export function SendTransaction({ reciepent, paymentData }) {


  const [messageApi, contextHolder] = message.useMessage();
  const methods = useForm({
    defaultValues: {
      owneraddress: paymentData.owneraddress,
      currency: paymentData.currency,
      amount: 0,
      recipient: paymentData.recipient,
    },
  });
  const { errors, defaultValues } = methods.formState;

  const [to, setTo] = useState("");
  const [debouncedTo] = useDebounce(to, 500);

  const [amount, setAmount] = useState("");
  const [debouncedAmount] = useDebounce(amount, 500);

  const { config, error: prepareTransactinoError } = usePrepareSendTransaction({
    to: debouncedTo,
    value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
  });

  // prepareTransactinoError || (error && toast.error(prepareTransactinoError.message));
  const { data, sendTransaction } = useSendTransaction(config);

  useEffect(() => {
    setTo(reciepent);
  }, [reciepent]);

  const handlePaymentCreateOnClick = (hash) => {
    console.log(hash);
  };

  const { isLoading, isSuccess, isError, error } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      handlePaymentCreateOnClick(data?.hash);
    },
    onError(error) {
      messageApi.open({
        type: "error",
        content: error.message,
        duration: 1.5,
      });
    },
  });

  const handlePayment = (e) => {
    e.preventDefault();
    sendTransaction?.();
  };

  if (isLoading) {
    messageApi.open({
      type: "loading",
      content: "Waiting transaction...",
      duration: 1.5,
    });
  };
  if (isError || error) return messageApi.open({
    type: "error",
    content: `Error: ${error.message || isError.message}`,
    duration: 1.5,
  });
  if (prepareTransactinoError) {
    const error = JSON.parse(JSON.stringify(prepareTransactinoError));
    messageApi.open({
      type: "error",
      content: error.shortMessage,
      duration: 1.5,
    });
  }

  return (
    <FormProvider {...methods}>
      {contextHolder}
      <Form
        onSubmit={(e) => {
          handlePayment(e);
        }}
      >
        <FormRow
          style={{
            minWidth: "100%",
          }}
          label="Payee"
          error={errors?.payee?.message}
        >
          {/* <Label>Payee</Label> */}
          <Input
            type="text"
            id="payee"
            defaultValue={defaultValues.owneraddress}
            readOnly
            {...methods.register("payee", {
              //necessary payee validation
            })}
          />
        </FormRow>

        {/* <Label> Currency</Label> */}
        <FormRow
          style={{
            minWidth: "100%",
          }}
          label="Currency"
          error={errors?.currency?.message}
        >
          <Input
            type="text"
            id="currency"
            defaultValue={defaultValues.currency}
            readOnly
            {...methods.register("currency", {
              //write a method to check if currency is same as one mentioned on invoice
            })}
          />
        </FormRow>

        <Divider
          sx={{
            height: 28,
            m: 1,
            color: "white",
          }}
          orientation="horizontal"
        />
        <FormRow
          style={{
            minWidth: "100%",
          }}
          label="Recipient"
          error={errors?.recipient?.message}
        >
          <Input
            type="text"
            id="recipient"
            defaultValue={defaultValues.recipient}
            readOnly
            {...methods.register("recipient", {
              //write method here to check if recipient is valid and same on invoice being paid
            })}
          />
        </FormRow>
        <FormRow
          style={{
            minWidth: "100%",
          }}
          label="Amount"
          error={errors?.amount?.message}
        >
          <Input
            type="number"
            id="amount"
            defaultValue={paymentData?.amount}
            {...methods.register("amount", {
              required: "Amount is required",
              max: {
                value: paymentData?.amount,
                message: `Amount cannot be greater than ${paymentData?.amount} remaining in proposal`,
              },
              min: {
                value: 0,
                message: "Amount cannot be negative",
              },
              //
            })}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormRow>

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
          <Container>
            Successfully sent {amount} ether to {to}
            {/* <Container> */}
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            {/* </Container> */}
          </Container>
        ) : null}
      </Form>
    </FormProvider>
  );
}
