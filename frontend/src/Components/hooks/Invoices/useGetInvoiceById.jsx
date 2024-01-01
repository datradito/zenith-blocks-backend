import { useQuery } from '@apollo/client';
import { GET_INVOICE_BY_ID } from "../../../ServerQueries/Invoices/Queries";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

function useGetInvoiceById() {
  const { invoiceId } = useParams();

  const { data, error, loading, refetch } = useQuery(GET_INVOICE_BY_ID, {
    variables: { id: invoiceId },
    onCompleted: (data) => {
      // handle query result
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (loading) {
    return { loading: true };
  }

  if (error) {
    return { error };
  }

  return {
    data,
    loading: false,
    error: null,
    refetch,
  };
}

export default useGetInvoiceById;
