import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import TableDisplay from '../DisplayElements/TableDisplay.jsx';
import ButtonAtom from "../atoms/Button/index";
import { useDispatch, useSelector } from 'react-redux';
import { setProposal, setProposalBudgetList } from '../../actions/currentProposal/index.js';
import { refreshState } from '../../actions/createBudgetAction/index.js';
import ItemCard from '../atoms/ItemCard/ItemCard.jsx';
import SubHeader from "../molecules/SubHeader/SubHeader.jsx"
import CircularIndeterminate from '../atoms/Loader/loader.jsx';
import useProposalDetails from '../hooks/useProposalDetails.jsx';
import useBudgets from '../hooks/useBudget.jsx';
import useWeb3IpfsContract from '../hooks/web3IPFS';


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
    const { web3, contract } = useWeb3IpfsContract();
    const { loading, error, data } = useProposalDetails(proposalId);
    const { proposals } = useSelector(state => state.currentProposalAmounts);
    const [ amount, setProposalAmount] = useState(0);
    const { budgetList, budgetsLoading } = useBudgets(web3, contract, proposalId);



    useEffect(() => {
        const filteredProposal = proposals.filter(proposal => proposal.id === proposalId ? proposal.amount: null);
        dispatch(refreshState());
        filteredProposal[0].amount ? setProposalAmount(filteredProposal[0].amount) : setProposalAmount(0);
    }, []);

    if (loading || budgetsLoading) return <CircularIndeterminate />;
    if (error) return <p>Error : {error.message}</p>;

    let dataForItemCard = { "Goverance": data.proposal.space.name, "Total Budget": amount, "Proposal": data.proposal.title };

    const handleExportCSV = () => {
        console.log("Export CSV");
    };

    const handleUpdateProposal = async () => {
        dispatch(setProposal(data.proposal, budgetList));
    };
    const handleBudgetCreateOnClick = () => {
        dispatch(setProposal(data.proposal, budgetList));
    }

    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    const componentButtonConfig = [
        {
            label: "Export CSVP",
            variant: "contained",
            onClick: handleExportCSV,
            innerText: "Export CSV",
            backgroundColor: "#282A2E",
            data: csvData,
        },
        {
            label: "Update Proposal",
            variant: "contained",
            onClick: handleUpdateProposal,
            innerText: "Update Proposal",
            ml: "0.5rem",
            type: "link",
            to: `/proposal/update/${proposalId}`,
        }
    ];

    const buttonConfig = {
        label: "Create budget",
        variant: "contained",
        onClick: handleBudgetCreateOnClick,
        innerText: "Create Budget"
    };

    const currentPathConfig = {
        path: "Proposals",
        to: `/proposals`
    };

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
                    {Object.entries(dataForItemCard).map(([key, value]) => (
                        <ItemCard
                            key={key}
                            label={key}
                            value={value}
                        />
                    ))}
                </Stack>
                {budgetList && (
                    <TableDisplay
                        tableHeaderData={headers}
                        tableBodyData={budgetList}
                    />
                ) || <>
                            <Link to={`/proposal/budgets/${proposalId}`}>
                                <ButtonAtom
                                    config={buttonConfig}
                                />
                            </Link>
                    </>
                }
            </Box>
        </div>
    );
}

export default ProposalDetailView;
