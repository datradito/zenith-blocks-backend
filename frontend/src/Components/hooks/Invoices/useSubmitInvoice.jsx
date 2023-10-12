import { SUBMIT_INVOICE_MUTATION } from "../../../ServerQueries/Invoices/Mutations.js";
import { client } from "../../../apolloConfig/client.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const useSubmitInvoice = () => {
  const queryClient = useQueryClient();
  const budgetId = useParams().budgetId;
  const navigate = useNavigate();
  const proposalId = useSelector((state) => state.currentProposal.proposal.id);

  const { mutate: createInvoice, isLoading: isCreating } = useMutation({
    mutationFn: async (invoiceData) => {
      await client.mutate({
        mutation: SUBMIT_INVOICE_MUTATION,
        variables: { invoice: invoiceData },
      },
      {
        errorPolicy: "all",
      }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoicesList", { budgetId }],
      });
      toast.success("Invoice created successfully");
      navigate(`/proposal/${proposalId}/invoices`);
    }
  });

  return { isCreating, createInvoice };
};


