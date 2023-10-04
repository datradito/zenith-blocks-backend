import Table from "../../molecules/Table/Table";
import Menus from "../../molecules/Menus/Menus";
import { useSearchParams } from "react-router-dom";
import EmptyIcon from "../../atoms/EmptyIcon/EmptyIcon";
import InvoiceRow from "./InvoiceRow";


function InvoiceList({isLoading, invoices}) {

//   const [searchParams] = useSearchParams();

//   if (!invoices.length) return <EmptyIcon />;

//   // 1) FILTER
//   const filterValue = searchParams.get("discount") || "all";

//   let filteredInvoices;
//   if (filterValue === "all") filteredInvoices = invoices;
//   if (filterValue === "no-discount")
//     filteredInvoices = invoices.filter((invoice) => invoice.amount === 0);
//   if (filterValue === "with-discount")
//     filteredInvoices = invoices.filter((invoice) => invoice.amount > 0);

//   // 2) SORT
//   const sortBy = searchParams.get("sortBy") || "startDate-asc";
//   const [field, direction] = sortBy.split("-");
//   const modifier = direction === "asc" ? 1 : -1;
//   const sortedInvoices = filteredInvoices.sort(
//     (a, b) => (a[field] - b[field]) * modifier
//   );
  console.log("invoices", invoices)
  
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
          // data={filteredCabins}
        //   data={sortedInvoices}
          render={(invoice) => (
            <InvoiceRow invoice={invoice} key={invoice.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default InvoiceList;
