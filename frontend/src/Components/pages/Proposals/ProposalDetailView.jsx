import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import TableDisplay from '../../DisplayElements/TableDisplay.jsx';
import ButtonAtom from "../../atoms/Button/index";
import { useDispatch, useSelector } from 'react-redux';
import { setProposal } from '../../../actions/currentProposal/index.js';
import { refreshState } from '../../../actions/createBudgetAction/index.js';
import ItemCard from '../../atoms/ItemCard/ItemCard.jsx';
import SubHeader from "../../molecules/SubHeader/SubHeader.jsx"
import CircularIndeterminate from '../../atoms/Loader/loader.jsx';
import useProposalDetails from '../../hooks/useProposalDetails.jsx';
import useWeb3IpfsContract from '../../hooks/web3IPFS';
import { useAllBudgetsForProposal } from '../../hooks/Budgets/useBudgetsForProposal.jsx';
import CustomizedSnackbars from '../../atoms/SnackBar/SnackBar.jsx';
import transformItems from '../../../Utility/transformItems.js';


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

const columns = [
    {field: 'id', headerName: 'ID', width: 70},
    { field: 'category', headerName: 'Category', width: '40%' },
    {
        field: 'amount',
        headerName: 'Allocated Budget',
        width: 150,
        editable: true,
    },
    {
        field: 'currency',
        headerName: 'Currency',
        width: 150,
        editable: true,
    },
    {
        field: 'breakdown',
        headerName: 'Breakdown',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'Remaining',
        headerName: 'Remaining',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.amount || ''} ${params.row.breakdown || ''}`,
    },
    {
        field: 'Invoices',
        headerName: 'Invoice',
        width: 110,
    },
];

function ProposalDetailView() {

    const { proposalId } = useParams();
    const dispatch = useDispatch();

    const { web3, contract } = useWeb3IpfsContract();
    const { loading, error, data } = useProposalDetails(proposalId);
    const { proposals } = useSelector(state => state.currentProposalAmounts);
    const [ amount, setProposalAmount] = useState(0);
    let { budgetList, budgetsLoading, budgetsError  } = useAllBudgetsForProposal(proposalId);

    dispatch(refreshState());

    const filteredProposal = useMemo(() => {
        return proposals.filter((proposal) => proposal.id === proposalId ? proposal.amount : null);
    }, [proposalId]);

    useEffect(() => {
        setProposalAmount(filteredProposal[0]?.amount);
    }, [filteredProposal]);
    
    //TOdo: move budget loading to tableDisplay to localize the loading
    if (loading || budgetsLoading) return <CircularIndeterminate />;
    if (error) return <CustomizedSnackbars severity="error" message={error.message} />;
    
    let dataForItemCard = { "Goverance": data.proposal.space.name, "Total Budget": amount, "Proposal": data.proposal.title };

    //TODO: memoize this
    budgetList = transformItems(budgetList.getBudgetsForProposal, amount);

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

    //store status of proposal, if totalBudgetedAmount is equal to proposalAmount then set proposal status to filled
    const proposalFilled = true;

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
            onClick: proposalFilled ? null :handleUpdateProposal,
            innerText: "Create Budget",
            disabled: proposalFilled,
            ml: "0.5rem",
            type: "link",
            to:  proposalFilled ? null : `/proposal/update/${proposalId}`,
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
