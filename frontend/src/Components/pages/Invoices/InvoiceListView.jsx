import React, { useEffect, useMemo, useState } from 'react'
import SubHeader from "../../molecules/SubHeader/SubHeader"
import { Box, Stack } from '@mui/material';
import ItemCard from "../../atoms/ItemCard/ItemCard";
import Table from '../../molecules/Table';
import { useLocation, Link  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetAllInvoicesByBudget } from '../../hooks/Invoices/useGetAllInvoices';
import CircularIndeterminate from '../../atoms/Loader/loader';
import { toast } from 'react-toastify';


const BoxStyle = {
    width: "90%",
    margin: "0rem auto",
    textAlign: "center",
    color: "white",
    border: ".05rem #2c2c2c solid",
    marginTop: "1rem",
    borderRadius: 3,
};

const tableHeaderData = ["Invoice", "Receipient", "Amount", "Currency", "Status", "Date", "Due","View", "Payment", "Action"]


function InvoiceListView() {
    let location = useLocation();
    let { proposal } = useSelector(state => state.currentProposal);
    const { proposals } = useSelector(state => state.currentProposalAmounts);
    const [amount, setProposalAmount] = useState(0);
    let { Budget } = useSelector(state => state.currentBudget);
    const { loading, invoices, queryError, isFetching } = useGetAllInvoicesByBudget(Budget?.id);

    const filteredProposal = useMemo(() => {
        return proposals.filter((withAmountProposal) => withAmountProposal.id === proposal.id ? withAmountProposal.amount : null);
    }, [proposal]);

    useEffect(() => {
        setProposalAmount(filteredProposal[0]?.amount);
    }, [filteredProposal]);


    if (queryError) {
        toast.error("Error in fetching invoices");
    }

    if (loading) return <CircularIndeterminate />;

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
    <SubHeader buttonConfig={componentButtonConfig} currentPath={currentPathConfig} previousPath="Proposals  Proposal  Budget" />
    <Box
      sx={BoxStyle}
    >
      <Stack
        padding={1}
        direction={"row"}
        justifyContent={'flex-start'}
        borderBottom={".05rem #2c2c2c solid"}
      >
        {Object.entries(dataForItemCard).map(([key, value]) => (
          <ItemCard
            key={key}
            label={key}
            value={value}
          />
        ))}
      </Stack>
    </Box>

    <Box sx={BoxStyle}>

        <Table
          tableHeaderData={tableHeaderData}
          tableBodyData={invoices}
        />

    </Box>
  </div>
);
}


export default InvoiceListView