import React, { useEffect, useMemo, useState } from 'react'
import SubHeader from "../../molecules/SubHeader/SubHeader"
import { Box, Stack } from '@mui/material';
import ItemCard from "../../atoms/ItemCard/ItemCard";
import Table from '../../molecules/Table';
import { parseInvoiceUrl } from '../../../Utility/parseInvoiceUrl';
import { useLocation, Link  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ButtonAtom from '../../atoms/Button';
import { useGetAllInvoicesByBudget } from '../../hooks/Invoices/useGetAllInvoices';
import CircularIndeterminate from '../../atoms/Loader/loader';
import { toast } from 'react-toastify';


const tableHeaderData = ["Invoice", "Receipient", "Amount", "Currency", "Status", "Date", "Due","View", "Payment", "Action"]


function InvoiceListView() {
    let location = useLocation();
    let { proposal } = useSelector(state => state.currentProposal);
    const { proposals } = useSelector(state => state.currentProposalAmounts);
    const [amount, setProposalAmount] = useState(0);
    let { Budget } = useSelector(state => state.currentBudget);
    //const { web3, contract } = useWeb3IpfsContract();
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

    const handleExportCSV = () => {
        console.log("Export CSV");
    };

    const handleCreateInvoice = () => {
        console.log("Create Invoice");
    };

    const currentPathConfig = {
        path: "Budgets",
        to: `/proposals/${proposal.id}`
    }

    const componentButtonConfig =
        [
            {
                label: "Export CSV",
                variant: "contained",
                onClick: handleExportCSV,
                innerText: "Export CSV",
                backgroundColor: "#282A2E",
                data: invoices,
                filetype: "invoices"
            }, {
                label: "Create Invoice",
                variant: "contained",
                onClick: handleCreateInvoice,
                innerText: "Create Invoice",
                ml: "0.5rem",
                type: "link",
                to: `/budgets/${Budget.id}/createinvoice`,
            }
        ];
    
    const dataForItemCard = { "Goverance": proposal.space, "Total Budget": `$ ${amount}`, "Proposal": proposal.title };

    const BoxStyle = {
        width: '90%',
        margin: '0rem auto',
        textAlign: "center",
        color: 'white',
        border: ".05rem #2c2c2c solid",
        marginTop: "1rem",
        borderRadius: 3
    };

    function handleInvoiceCreateOnClick() {

    }
    
    const buttonConfig = {
        label: "Create Invoices",
        variant: "contained",
        onClick: handleInvoiceCreateOnClick,
        innerText: "Create Invoice"
    };

    if (invoices === [] || invoices === null || invoices === undefined || invoices.length === 0 && parseInvoiceUrl(location.pathname) !== null) {
        return (
            <Box sx={BoxStyle}>  
                <p>Create invoices for budget below. No invoices has been coded for this budget so far.</p>
                <Link to={`/budgets/${Budget.id}/createInvoice`}>
                    <ButtonAtom config={buttonConfig} />
                </Link>
            </Box>
        )
    } else {
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
                        {
                            Object.entries(dataForItemCard).map(([key, value]) => {
                                return <ItemCard
                                    key={key}
                                    label={key}
                                    value={value}
                                />
                            })
                        }
                    </Stack>
                </Box>
                <Box sx={BoxStyle}>
                    <Table
                        tableHeaderData={tableHeaderData}
                        tableBodyData={invoices}
                        dataToDisplay={[]}
                    />
                </Box>
            </div>
        )
    }
}

export default InvoiceListView