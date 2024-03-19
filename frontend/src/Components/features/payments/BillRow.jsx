import React from 'react'
import Table from "../../molecules/Table/Table";
import ScrollContainer from "../../atoms/Scroll/ScrollContainer";

function BillRow({ bill }) {

  const {
    Category,
    Amount,
    Currency,
  } = bill;


  return (
    <Table.Row>
      <ScrollContainer>{Category}</ScrollContainer>
      <ScrollContainer>{Amount}</ScrollContainer>
      <ScrollContainer>{Currency}</ScrollContainer>
    </Table.Row>
  );
}

export default BillRow