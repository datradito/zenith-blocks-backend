import Table from "../../molecules/Table/Table";
import Menus from "../../molecules/Menus/Menus";
import InvoiceRow from "./InvoiceRow";
import CircularIndeterminate from "../../atoms/Loader/loader";


function InvoiceList({ isLoading, invoices }) {
  if (isLoading) {
    return <CircularIndeterminate />;
  }
  
  return (
    <Menus>
      <Table columns="0.2fr 0.7fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr">
        <Table.Header>
          <div>Invoice</div>
          <div>Reciepient</div>
        <div>Amount</div>
        <div>Currency</div>
        <div>Status</div>
        <div>Date</div>
        <div>Due</div>
        <div>View</div>
        <div>Payment</div>
        <div>Action</div>
        </Table.Header>
        
        <Table.Body
          data={invoices}
          render={(invoice) => (
            <InvoiceRow invoice={invoice} key={invoice.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default InvoiceList;
