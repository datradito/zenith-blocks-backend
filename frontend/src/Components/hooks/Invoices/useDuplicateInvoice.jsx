import {
  DUPLICATE_INVOICE_MUTATION,
} from "../../../ServerQueries/Invoices/Mutations.js";
import { client } from "../../../apolloConfig/client.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetInvoice } from "../../../actions/createInvoiceAction/index.js";


export const useDuplicateInvoice = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const proposalId = useSelector((state) => state.currentProposal.proposal.id);

  const { mutate: duplicateInvoice, isLoading: isDuplicating } = useMutation({
    mutationFn: async (invoiceId) => {
      await client.mutate({
        mutation: DUPLICATE_INVOICE_MUTATION,
        variables: { id: invoiceId },
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

  return { isDuplicating, duplicateInvoice };
};
