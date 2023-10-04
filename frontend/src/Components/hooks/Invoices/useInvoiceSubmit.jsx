
import { SUBMIT_INVOICE_MUTATION } from "../../../ServerQueries/Invoices/Mutations.js";
import { client, queryClient } from "../../../apolloConfig/client.js";
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { resetInvoice } from "../../../actions/createInvoiceAction";

export const useInvoiceSubmit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const proposalId = useSelector(state => state.currentProposal.proposal.id);

  const { mutate: createInvoice, isLoading: isCreating } = useMutation({
      mutationFn: async (invoiceData) => {
          await client.mutate({
              mutation: SUBMIT_INVOICE_MUTATION,
              variables: { invoice: invoiceData },
          });
        },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["invoices"] });
        toast.success("Invoice created successfully");
        navigate(`/proposal/${proposalId}/invoices`);
        dispatch(resetInvoice());
    },
      onError: (err) => {
          toast.error(err.message);
    },
  });

  return { isCreating, createInvoice };

};