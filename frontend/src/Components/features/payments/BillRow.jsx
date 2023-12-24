import React from 'react'
import Table from "../../molecules/Table/Table";
import ScrollContainer from "../../atoms/Scroll/ScrollContainer";

function BillRow({ invoice }) {

  const {
    category,
    total,
    currency,
  } = invoice.getInvoiceById;


  return (
    <Table.Row>
      <ScrollContainer>{category}</ScrollContainer>
      <ScrollContainer>{total}</ScrollContainer>
      <ScrollContainer>{currency}</ScrollContainer>
    </Table.Row>
  );
}

export default BillRow