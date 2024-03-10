import { DUPLICATE_INVOICE_MUTATION } from "../../../model/invoices/mutation.js";
import { client } from "../../../config/apolloConfig/client.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useProposalStore from "../../../store/modules/proposal/index.ts";
import { message } from "antd";
export const useDuplicateInvoice = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { currentProposal } = useProposalStore();

  const { mutate: duplicateInvoice, isLoading: isDuplicating } = useMutation({
    mutationFn: async (invoiceId) => {
      await client.mutate({
        mutation: DUPLICATE_INVOICE_MUTATION,
        variables: { id: invoiceId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      message.success("Invoice duplicated successfully");
      navigate(`/proposal/${currentProposal?.id}/invoices`);
    },
    onError: (err) => {
      message.error("Error duplicating invoice");
    },
  });

  return { isDuplicating, duplicateInvoice };
};
