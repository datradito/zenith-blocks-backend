import React, {  useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROPOSAL_BY_ID } from '../../SnapShot/Queries.js';
import { Box, Stack } from '@mui/material';
import TableDisplay from '../DisplayElements/TableDisplay.jsx';
import ButtonAtom from "../atoms/Button/index";
import { useDispatch } from 'react-redux';
import { setProposal } from '../../actions/currentProposal/index.js';
import ItemCard from '../atoms/ItemCard/ItemCard.jsx';

const data2 = [
    { id: 1, value1: 'Value 1-1', value2: 'Value 1-2', value3: 'Value 1-3', value4: 'Value 1-4', value5: 'Value 1-5' },
    { id: 2, value1: 'Value 2-1', value2: 'Value 2-2', value3: 'Value 2-3', value4: 'Value 2-4', value5: 'Value 2-5' },
    { id: 3, value1: 'Value 3-1', value2: 'Value 3-2', value3: 'Value 3-3', value4: 'Value 3-4', value5: 'Value 3-5' },
    { id: 4, value1: 'Value 4-1', value2: 'Value 4-2', value3: 'Value 4-3', value4: 'Value 4-4', value5: 'Value 4-5' },
    { id: 5, value1: 'Value 5-1', value2: 'Value 5-2', value3: 'Value 5-3', value4: 'Value 5-4', value5: 'Value 5-5' },
];


const BoxStyle = {
    width: '90%',
    margin: '0rem auto',
    textAlign: "center",
    color: 'white',
    border: ".05rem #BDBDBB solid",
    marginTop: "1rem",
    borderRadius: 3
};


const headers = ["Categories", "Allocated Budget", "Currency", "Breakdown", "Remaining", "View"]

function ProposalDetailView() {
    const { proposalId } = useParams();
    const dispatch = useDispatch();
    const [budgetList, setBudgetList] = useState([])
    const { loading, error, data } = useQuery(GET_PROPOSAL_BY_ID, {
        // skip: skipQuery,
        variables: { id: proposalId },
    });

    // useEffect(() => {
    //     if (currentProposal) {
    //         setProposal(currentProposal)
    //     };
    // }, [currentProposal]);

    // useEffect(() => {
    //     if (data) {
    //         setCurrentProposal(data)
    //     } 
    // }, [data])


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;


    const handleBudgetCreateOnClick = () => {
        dispatch(setProposal(data.proposal));
    }

    const dataForItemCard = { "Goverance": data.proposal.space.name, "Total Budget": "$5,980,000", "Proposal": data.proposal.title };

    const buttonConfig = {
        label: "Create budget",
        variant: "contained",
        onClick: handleBudgetCreateOnClick,
        innerText: "Create Budget"
    };

    return (
        <Box sx={BoxStyle}>
            <Stack
                margin={1}
                padding={1}
                direction={"row"}
                justifyContent={'flex-start'}
                borderBottom={".05rem #BDBDBB solid"}
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
                <Link to={`/proposal/budgets/${proposalId}`}>
                    <ButtonAtom
                        config={buttonConfig}
                    />
                </Link>
                :
                <TableDisplay
                    tableHeaderData={headers}
                    tableBodyData={data2}
                    dataToDisplay={budgetList}
                />
            }

        </Box>
    )
}

export default ProposalDetailView
