import React, { useEffect, useMemo } from 'react'
import SubHeader from "../../molecules/SubHeader/SubHeader"
import { Box, Stack } from '@mui/material';
import ItemCard from "../../atoms/ItemCard/ItemCard";
import TableDisplay from "../../DisplayElements/TableDisplay";
import { parseInvoiceUrl } from '../../../Utility/parseInvoiceUrl';
import { useLocation, useNavigate, Link  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useWeb3IpfsContract from '../../hooks/web3IPFS';
import ButtonAtom from '../../atoms/Button';
import { useGetAllInvoicesByBudget } from '../../hooks/Invoices/useGetAllInvoices';
import CircularIndeterminate from '../../atoms/Loader/loader';


const tableHeaderData = ["Invoice", "Receipient", "Amount", "Currency", "Status", "Date", "Due","View", "Payment", "Action"]


function InvoiceListView() {
    let location = useLocation();
    let { proposal } = useSelector(state => state.currentProposal);
    const { proposals } = useSelector(state => state.currentProposalAmounts);
    const [amount, setProposalAmount] = useState(0);
    let { Budget } = useSelector(state => state.currentBudget);
    const { web3, contract } = useWeb3IpfsContract();

    console.log("proposal", proposal);

    // const getInvoicesCid = async (contract, budgetId) => {
    //     try {
    //         const decryptedbudgetId = web3.utils.keccak256(web3.utils.fromAscii(budgetId));
    //         const result = await contract.methods.getInvoicesByBudget(decryptedbudgetId).call();
    //         setInvoices(result);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };


    const filteredProposal = useMemo(() => {
        return proposals.filter((withAmountProposal) => withAmountProposal.id === proposal.id ? withAmountProposal.amount : null);
    }, [proposal]);

    useEffect(() => {
        setProposalAmount(filteredProposal[0]?.amount);
    }, [filteredProposal]);

    //step 1 - For Budget Id -> check in smartContract if it exists , if it does not render create invoices page
    // useEffect(() => {
    //     // if (parseInvoiceUrl(location.pathname) !== null) {
    //     //     let { budgetId } = parseInvoiceUrl(location.pathname);
    //     //     // if (contract !== null) {
    //     //     //     let result = getInvoicesCid(contract, budgetId);
    //     //     //     result.then((res) => {
    //     //     //         setInvoices(res);
    //     //     //     });
    //     //     // }
    //     // }
    // }, []);

    const { loading, data, budgetInvoices, queryError } = useGetAllInvoicesByBudget(Budget?.id);

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
                type: "link",
                to: '/proposal/budgets/export-csv',
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

    if (budgetInvoices === [] || budgetInvoices === null || budgetInvoices === undefined || budgetInvoices.length === 0 && parseInvoiceUrl(location.pathname) !== null) {
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
                    <TableDisplay
                        tableHeaderData={tableHeaderData}
                        tableBodyData={budgetInvoices}
                        dataToDisplay={[]}
                    />
                </Box>
            </div>
        )
    }
    
}

export default InvoiceListView