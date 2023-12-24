import React from "react";
import BillRow from "./BillRow";
import Table from "../../molecules/Table/Table";
import useGetInvoiceById from "../../hooks/Invoices/useGetInvoiceById";
import { useParams } from "react-router-dom";
import CircularIndeterminate from "../../atoms/Loader/loader";
import Container from "../../atoms/Container/Container";
import { toast } from "react-hot-toast";
import CustomPDFViewIcon from "../../atoms/PdfIcon/padfIcon";
import styled from "styled-components";

const PdfContainer = styled(Container)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;


function BillList() {
  const { invoiceId } = useParams();
  const { data, error, loading, refetch } = useGetInvoiceById(invoiceId);

  if (loading) return <CircularIndeterminate />;
  if (error) return toast.error(error.message);

  return (
    <Container>
      <Table columns="0.4fr 0.4fr 0.4fr">
        <Table.Header>
          <div>Category</div>
          <div>Amount</div>
          <div>Currency</div>
        </Table.Header>

        <Table.Body
          data={[data]}
          // data={filteredCabins}
          //   data={sortedInvoices}
          render={(invoice) => <BillRow invoice={invoice} />}
        />
      </Table>
      <PdfContainer>
        <CustomPDFViewIcon label="Download PDF" />
      </PdfContainer>
    </Container>
  );
}

export default BillList;
