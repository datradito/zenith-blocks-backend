import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { useSubmitPayment } from "../../hooks/Payments/useSubmitPayment";
import useGetAbi from "../../hooks/Web3/useGetAbi";
import useHandleTransfer from "../../hooks/Payments/useHandleTransfer";
import SubHeader from "../../molecules/SubHeader/SubHeader";
import Input from "../../atoms/Input/Input";
import { Divider } from "@mui/material";
import Form from "../../atoms/Form/Form";
import FormRow from "../../atoms/FormRow/FormRow";
import { message } from "antd";
import { parseUnits } from "viem";
import {
  useWaitForTransaction,
} from "wagmi";

export function SendTransaction({ reciepent, paymentData }) {
  const { contractABI, contractAddress } = useGetAbi(paymentData.currency);
  const handleTransfer = useHandleTransfer();
  const { submitPaymentMutation } = useSubmitPayment();
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
  const [ hash, setHash ] = useState("");

  const [amount, setAmount] = useState("");
  const [debouncedAmount] = useDebounce(amount, 500);


  useEffect(() => {
    setTo(reciepent);
  }, [reciepent]);

  const handlePaymentCreateOnClick = (hash, status) => {

    const paymentInput = {
      invoiceid: paymentData.id,
      currency: paymentData.currency,
      total: parseInt(amount),
      status: status,
      transactionhash: hash,
      budgetid: paymentData.budgetid,
    };

    submitPaymentMutation(paymentInput);
  };


  const { isLoading, isSuccess, isError, error } = useWaitForTransaction({
    hash: hash,
    onSuccess(data) {
      handlePaymentCreateOnClick(hash, "paid");
    },
    onError(error) {
      messageApi.open({
        type: "error",
        content: error.shortMessage,
        duration: 1.5,
      });
    },
  });

  const handlePayment = async() => {
    const transactionConfig = {
      contractAddress: contractAddress,
      contractABI: contractABI,
      address: debouncedTo,
      amount: Number(
        parseUnits(debouncedAmount, paymentData.currency)
      ).toString(),
    };

    try {
      const data = await handleTransfer(transactionConfig);
      setHash(data?.hash);
    } catch (error) {
      message.error(
        error?.shortMessage || "Error: Transaction failed"

      )
    }

  };

  // if (writeLoading) {
  //   messageApi.open({
  //     type: "loading",
  //     content: "Waiting transaction...",
  //     duration: 1.5,
  //   });
  // }
  // if (writeError)
  //   return messageApi.open({
  //     type: "error",
  //     content: `Error: ${writeError.shortMessage || isError.shortMessage}`,
  //     duration: 1.5,
  //   });
  // if (prepareWriteContractError) {
  //   //const error = JSON.parse(JSON.stringify(prepareWriteContractError));
  //   messageApi.open({
  //     type: "error",
  //     content: prepareWriteContractError.shortMessage,
  //     duration: 1.5,
  //   });
  // }

  return (
    <FormProvider {...methods}>
      {contextHolder}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handlePayment();
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
            disabled={!to || !amount}
            label={ "Pay Invoice"}
          />
        </>
      </Form>
    </FormProvider>
  );
}
