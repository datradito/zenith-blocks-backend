import { SUBMIT_INVOICE_MUTATION } from "../../../ServerQueries/Invoices/Mutations.js";
import { client } from "../../../apolloConfig/client.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { resetInvoice } from "../../../actions/createInvoiceAction/index.js";

export const useSubmitInvoice = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const proposalId = useSelector((state) => state.currentProposal.proposal.id);

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
