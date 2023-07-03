import React, {  useEffect, useState } from 'react'
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
import CircularIndeterminate from '../atoms/Loader/loader.jsx';
import axios from 'axios';

const BoxStyle = {
    width: '90%',
    margin: '0rem auto',
    textAlign: "center",
    color: 'white',
    border: ".05rem #2c2c2c solid",
    marginTop: "1rem",
    borderRadius: 3
};

function transformItems(item, totalBudget) {
    const { action, ...rest } = item; // Destructure the 'action' property and store the remaining properties in 'rest'
    return { ...rest, Remaining: parseInt(totalBudget - parseInt(item["Allocated Budget"])), Invoices: 'INVOICE' };
}


const headers = ["Categories", "Allocated Budget", "Currency", "Breakdown", "Remaining", "Invoices"]

function ProposalDetailView() {
    const { proposalId } = useParams();
    const dispatch = useDispatch();
    const [budgetList, setBudgetList] = useState(null)
    //let storedCurrentProposal = useSelector(state => state.currentProposal);
    
    useEffect(() => {
        const hashesForBudgets = ['https://ipfs.moralis.io:2053/ipfs/QmVJZQE9Pr1cncADELH2kqkCshxhxBELACCDxDqX83Qu2D/0xce9b0991276c79cccc773a327814fa07942a3287e022fc9e75378bdcd491b337fa559ab2-6252-4d21-b0ee-d89616aa21df'];
        const listOfBudgets = [];

        fetchBudgetDataForCurrentProposal(hashesForBudgets[0])
            .then(data => {
                listOfBudgets.push(transformItems(data, 500));
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setBudgetList(listOfBudgets);
    }, [proposalId]);
    

    const fetchBudgetDataForCurrentProposal = async (url) => {
        try {
            const response = await axios.get(url)
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch budget data');
        }
    };

    let { loading, error, data } = useQuery(GET_PROPOSAL_BY_ID, {
        variables: { id: proposalId },
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    let dataForItemCard = { "Goverance": data.proposal.space.name, "Total Budget": 800, "Proposal": data.proposal.title };

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
                {budgetList !== null && // Check if budgetList is not null before rendering
                    <TableDisplay
                        tableHeaderData={headers}
                        tableBodyData={budgetList}
                    />
                }

            </Box>
        </div>
    )
}

export default ProposalDetailView
