import React, { useEffect, useMemo, useState } from 'react'
import SubHeader from "../../molecules/SubHeader/SubHeader"
import { Box, Stack } from '@mui/material';
import ItemCard from "../../atoms/ItemCard/ItemCard";
import Table from '../../molecules/Table';
import { useSelector } from 'react-redux';
import CircularIndeterminate from '../../atoms/Loader/loader';
import { useGetAllInvoices } from '../../hooks/Invoices/useGetInvoices';
import InvoiceList from '../../features/invoices/InvoiceList';
import EmptyIcon from '../../atoms/EmptyIcon/EmptyIcon';


const BoxStyle = {
    width: "90%",
    margin: "0rem auto",
    textAlign: "center",
    color: "white",
    border: ".05rem #2c2c2c solid",
    marginTop: "1rem",
    borderRadius: 3,
};


function InvoiceListView() {
    let { proposal } = useSelector(state => state.currentProposal);
    const { proposals } = useSelector(state => state.currentProposalAmounts);
    const [amount, setProposalAmount] = useState(0);
    let { Budget } = useSelector(state => state.currentBudget);
  const { isLoading, invoices } = useGetAllInvoices(Budget?.id);


    const filteredProposal = useMemo(() => {
        return proposals.filter((withAmountProposal) => withAmountProposal.id === proposal.id ? withAmountProposal.amount : null);
    }, [proposal]);

    useEffect(() => {
        setProposalAmount(filteredProposal[0]?.amount);
    }, [filteredProposal]);

    const currentPathConfig = {
        path: "Budgets",
        to: `/proposals/${proposal.id}`
    }

    const componentButtonConfig =
        [
            {
                label: "Export CSV",
                variant: "contained",
                innerText: "Export CSV",
                backgroundColor: "#282A2E",
                data: invoices,
                filetype: "invoice"
            }, {
                label: "Create Invoice",
                variant: "contained",
                innerText: "Create Invoice",
                ml: "0.5rem",
                type: "link",
                to: `/budgets/${Budget.id}/createinvoice`
            }
        ];
    
    const dataForItemCard = { "Goverance": proposal.space, "Total Budget": `$ ${amount}`, "Proposal": proposal.title };
return (
  <div>
    <SubHeader
      buttonConfig={componentButtonConfig}
      currentPath={currentPathConfig}
      previousPath="Proposals  Proposal  Budget"
    />
    <Box sx={BoxStyle}>
      <Stack
        padding={1}
        direction={"row"}
        justifyContent={"flex-start"}
        borderBottom={".05rem #2c2c2c solid"}
      >
        {Object.entries(dataForItemCard).map(([key, value]) => (
          <ItemCard key={key} label={key} value={value} />
        ))}
      </Stack>
    </Box>

    <Box sx={BoxStyle}>
      {isLoading ? (
        <CircularIndeterminate />
      ) : invoices && invoices.length > 0 ? (
        <InvoiceList isLoading={isLoading} invoices={invoices} />
      ) : (
        <EmptyIcon />
      )}
    </Box>
  </div>
);
}


export default InvoiceListView