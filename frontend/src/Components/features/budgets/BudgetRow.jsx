import styled from "styled-components";
import CustomizedProgressBars from "../../atoms/ProgressBar/ProgressBar";
import Table from "../../molecules/Table/Table";
import CustomInvoiceViewIcon from "../../atoms/InvoiceIcon/InvoiceIcon";

const ScrollContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
  text-overflow: ellipsis;
`;

function BudgetRow({ budget }) {

  const { id, category, amount, currency, remaining, Breakdown } = budget;

  return (
    <Table.Row>
      <ScrollContainer>{category}</ScrollContainer>
      <ScrollContainer>{amount}</ScrollContainer>
      <ScrollContainer>{currency}</ScrollContainer>
      <ScrollContainer>
        <CustomizedProgressBars value={Breakdown} />
      </ScrollContainer>
      <ScrollContainer>{remaining}</ScrollContainer>
      <ScrollContainer>
        <CustomInvoiceViewIcon budgetId={id} />
      </ScrollContainer>

    </Table.Row>
  );
}

export default BudgetRow;
