import { useQuery } from '@apollo/client';
import { GET_INVOICE_BY_ID } from '../../../ServerQueries/Invoices/Queries';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function useGetInvoiceById() {

  const { invoiceId } = useParams();

    let { data, error, loading, refetch } = useQuery(GET_INVOICE_BY_ID, {
      variables: { id: invoiceId },
      errorPolicy: "all",
        onCompleted: () => {
          // const transformedInvoices = transformInvoices(data.getInvoicesByBudget);
        //   data  = data.getInvoiceById;
        },
      onError: (errors) => {
        toast.error(errors.message);
      },
    });

    
    return { data, error, loading, refetch };
}

export default useGetInvoiceById