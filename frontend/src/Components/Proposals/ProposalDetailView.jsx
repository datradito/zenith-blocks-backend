import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { GET_PROPOSAL_BY_ID } from '../../SnapShot/Queries.js';
import { Box } from '@mui/material';
import TableDisplay from '../DisplayElements/TableDisplay.jsx';
import ButtonAtom from "../atoms/Button/index"


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
    border: ".05rem #272A30 solid",
    marginTop: "1rem"
};

const label = {
    color: 'Gray',
    fontSize: '.65rem'
}

const SubItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A1C1E',
    padding: theme.spacing(1),
    margin: theme.spacing(.5),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
}));

const ColumnItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A1C1E',
    textAlign: 'left',
    color: 'white',
    boxShadow: 'none',
    fontSize: '.85rem'
}));

const subItemStyle = {
    minWidth: 200,
}

const headers = ["Categories", "Allocated Budget", "Currency", "Breakdown", "Remaining", "View"]

function ProposalDetailView() {
    const { proposalId } = useParams();
    const [budgetList, setBudgetList] = useState([])
    const { loading, error, data } = useQuery(GET_PROPOSAL_BY_ID, {
        // skip: skipQuery,
        variables: { id: proposalId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;


    const handleBudgetCreateOnClick = () => {
        console.log("create budget clicked!")
    }

    const buttonConfig = {
        label: "Create budget",
        variant: "contained",
        //type: "submit",
        onClick: handleBudgetCreateOnClick,
        innerText: "Create Budget"
    };

    return (
        <Box
            sx={BoxStyle}
            borderRadius={3}
        >
            <Stack
                margin={1}
                padding={1}
                direction="row"
                justifyContent='flex-start'
                borderBottom=".05rem #272A30 solid"
            >
                <SubItem sx={subItemStyle}>
                    <ColumnItem sx={label}>Goverance</ColumnItem>
                    <ColumnItem>{data.proposal.space.name}</ColumnItem>
                </SubItem>
                <SubItem sx={subItemStyle}>
                    <ColumnItem sx={label}>Total Budget</ColumnItem>
                    <ColumnItem>$5,980,000</ColumnItem>
                </SubItem>
                <SubItem >
                    <Stack>
                        <ColumnItem sx={label}>Proposal</ColumnItem>
                        <ColumnItem>{data.proposal.title}</ColumnItem>
                    </Stack>
                </SubItem>
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
