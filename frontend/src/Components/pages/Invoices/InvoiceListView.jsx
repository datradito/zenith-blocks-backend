import React from 'react'
import SubHeader from "../../molecules/SubHeader/SubHeader"
import ItemCardComponent from "../../atoms/ItemCard/ItemCard";
import { useSelector } from 'react-redux';
import CircularIndeterminate from '../../atoms/Loader/loader';
import { useGetAllInvoices } from '../../hooks/Invoices/useGetInvoices';
import { useNavigate } from 'react-router-dom';
import InvoiceList from '../../features/invoices/InvoiceList';
import EmptyIcon from '../../atoms/EmptyIcon/EmptyIcon';
import Label from '../../atoms/Label/Label';
import GoBack from '../../atoms/GoBack/GoBack';
import Container from '../../atoms/Container/Container';


function InvoiceListView() {
  let { Budget } = useSelector(state => state.currentBudget);
  const { isLoading, invoices } = useGetAllInvoices(Budget?.id);
  const navigate = useNavigate();
  
  const handleCreateInvoice = () => {
    navigate(`/budgets/${Budget.id}/createinvoice`);
  };
    
return (
  <div>
    <SubHeader.Container sx={{ paddingTop: "1rem" }}>
      <SubHeader.List
        sx={{
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <Label>Proposals | Budgets | Invoices</Label>
        <GoBack>
          <Label>Budgets</Label>
        </GoBack>
      </SubHeader.List>
      <SubHeader.List>
        <SubHeader.ActionButton
          label="Export CSV"
          sx={{
            backgroundColor: "#282A2E",
          }}
        />
        <SubHeader.ActionButton
          onClick={handleCreateInvoice}
          label="Create Invoice"
        />
      </SubHeader.List>
    </SubHeader.Container>

    <ItemCardComponent />
    
    <Container>
      {isLoading ? (
        <CircularIndeterminate />
      ) : invoices && invoices.length > 0 ? (
        <InvoiceList isLoading={isLoading} invoices={invoices} />
      ) : (
        <EmptyIcon />
      )}
    </Container>
  </div>
);
}


export default InvoiceListView