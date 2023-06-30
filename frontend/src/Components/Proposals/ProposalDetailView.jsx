import React, {  useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROPOSAL_BY_ID } from '../../SnapShot/Queries.js';
import { Box, Stack } from '@mui/material';
import TableDisplay from '../DisplayElements/TableDisplay.jsx';
import ButtonAtom from "../atoms/Button/index";
import { useDispatch } from 'react-redux';
import { setProposal } from '../../actions/currentProposal/index.js';
import ItemCard from '../atoms/ItemCard/ItemCard.jsx';
import SubHeader from "../molecules/SubHeader/SubHeader.jsx"
import { useSelector } from 'react-redux';

const data2 = [
    { id: 1,Categories: "Base Czy podczas KZB powinien zostać poruszony temat zdecentralizowanego rozstrzygania sporów z wykorzystaniem blockchain?", "Allocated Budget": '$3,360,000', Currency: 'ETH', Breakdown: '56.93389%', Remaining: '$100000', Invoices: 'INVOICE' },
    { id:2,Categories: "Base Compensation", "Allocated Budget": '$3,360,000', Currency: 'ETH', Breakdown: '76.87658%', Remaining: '$100000', Invoices: 'INVOICE' },
    {
        id: 3, Categories: "Base Czy podczas KZB powinien zostać poruszony temat zdecentralizowanego rozstrzygania sporów z wykorzystaniem blockchain?", "Allocated Budget": '$3,360,000', Currency: 'ETH', Breakdown: '56.93389%', Remaining: '$100000', Invoices: 'INVOICE',
    },
    { category: "sdfhg", "Allocated Budget": "5,980,000", currency: "EUR", Breakdown: "100%", "Allocated Budget": "5,980,000", Invoices: 'INVOICE' }];  


const BoxStyle = {
    width: '90%',
    margin: '0rem auto',
    textAlign: "center",
    color: 'white',
    border: ".05rem #2c2c2c solid",
    marginTop: "1rem",
    borderRadius: 3
};


const headers = ["Categories", "Allocated Budget", "Currency", "Breakdown", "Remaining", "Invoices"]

function ProposalDetailView() {
    const { proposalId } = useParams();
    const dispatch = useDispatch();
    const [budgetList, setBudgetList] = useState([])
    //let storedCurrentProposal = useSelector(state => state.currentProposal);

    let { loading, error, data } = useQuery(GET_PROPOSAL_BY_ID, {
        variables: { id: proposalId },
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    let dataForItemCard = { "Goverance": data.proposal.space.name, "Total Budget": "$5,980,000", "Proposal": data.proposal.title };

    const handleBudgetCreateOnClick = () => {
        dispatch(setProposal(data.proposal));
    }


    const buttonConfig = {
        label: "Create budget",
        variant: "contained",
        onClick: handleBudgetCreateOnClick,
        innerText: "Create Budget"
    };

    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    const handleExportCSV = () => {
        console.log("Export CSV");
    };

    const handleUpdateProposal = async () => {

        //ToDo: take data from the form and save it to corresponding ipfs file and then move to do the following. add boundaries to throw error in case proposal is not updated
        dispatch(setProposal(data.proposal));
    };

    const componentButtonConfig =
        [
            {
                label: "Export CSVP",
                variant: "contained",
                onClick: handleExportCSV,
                innerText: "Export CSV",
                backgroundColor: "#282A2E",
                // type: "link",
                // to: '/proposal/budgets/export-csv',
                data: csvData,
            }, {
                label: "Update Proposal",
                variant: "contained",
                onClick: handleUpdateProposal,
                innerText: "Update Proposal",
                ml: "0.5rem",
                type: "link",
                to: `/proposal/update/${proposalId}`,
            }
        ];
    
    // console.log(componentButtonConfig[0].data)
    
    const currentPathConfig = {
        path: "Proposals",
        to: `/proposals`
    }

    return (
        <div>
            <SubHeader buttonConfig={componentButtonConfig} currentPath={currentPathConfig} previousPath='Proposals' />
            <Box sx={BoxStyle}>
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
                {budgetList ?
                    <TableDisplay
                        tableHeaderData={headers}
                        tableBodyData={data2}
                        dataToDisplay={budgetList}
                    />
                    :
                    <Link to={`/proposal/budgets/${proposalId}`}>
                        <ButtonAtom
                            config={buttonConfig}
                        />
                    </Link>
                }
            </Box>
        </div>
    )
}

export default ProposalDetailView
