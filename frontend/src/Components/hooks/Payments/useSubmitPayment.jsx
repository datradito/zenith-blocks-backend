import { useMutation } from "@apollo/client";
import { SUBMIT_PAYMENT } from "../../../model/payments/mutation";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export const useSubmitPayment = () => {
  const navigate = useNavigate();

  const [submitPayment, { loading, error, data, refetch }] = useMutation(
    SUBMIT_PAYMENT,
    {
      onCompleted: (data) => {
        message.success("Payment successful!");
        navigate("/proposals");
      },
      onError: (error) => {
        message.error(error.message);
      },
    }
  );

  const submitPaymentMutation = (payment) => {
    submitPayment({
      variables: {
        paymentInput: payment,
      },
    });
  };

  return { loading, error, data, refetch, submitPaymentMutation };
};
