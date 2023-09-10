import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import TableDisplay from '../../DisplayElements/TableDisplay.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setProposal } from '../../../actions/currentProposal/index.js';
import { refreshState } from '../../../actions/createBudgetAction/index.js';
import ItemCard from '../../atoms/ItemCard/ItemCard.jsx';
import SubHeader from "../../molecules/SubHeader/SubHeader.jsx"
import CircularIndeterminate from '../../atoms/Loader/loader.jsx';
import useProposalDetails from '../../hooks/Proposals/useProposalDetails.jsx';
import useWeb3IpfsContract from '../../hooks/web3IPFS';
import { useAllBudgetsForProposal } from '../../hooks/Budgets/useBudgetsForProposal.jsx';
import {transformItems} from '../../../Utility/transformItems.js';
import SnackbarMessage from '../../atoms/SnackBarGql/SnackBarGql.jsx';
import { toast } from 'react-toastify';

const BoxStyle = {
    width: '90%',
    margin: '0rem auto',
    textAlign: "center",
    color: 'white',
    border: ".05rem #2c2c2c solid",
    marginTop: "1rem",
    borderRadius: 3,
    paddingBottom: "1rem"
};

const headers = ["Categories", "Allocated Budget", "Currency", "Breakdown", "Remaining", "Invoices"]

function ProposalDetailView() {

    const { proposalId } = useParams();
    const dispatch = useDispatch();

    const { web3, contract } = useWeb3IpfsContract();
    const { loading, error, data } = useProposalDetails(proposalId);
    const { proposals } = useSelector(state => state.currentProposalAmounts);
    const [pageWarnings, setPageWarnings] = useState();
    const [amount, setProposalAmount] = useState(0);
    const [ status, setStatus ] = useState();
    let { budgetList, budgetsLoading, budgetsError } = useAllBudgetsForProposal(proposalId);

    dispatch(refreshState());

    const filteredProposal = useMemo(() => {
        return proposals.filter((proposal) => proposal.id === proposalId ? proposal : null);
    }, [proposalId, proposals]);

    useEffect(() => {
        setProposalAmount(filteredProposal[0]?.amount);
        setStatus(filteredProposal[0]?.status === 'Funded' ? true : false);
    }, [filteredProposal]);

    const handlePageValidation = () => {
        setPageWarnings(["Either Proposal is already filled or Missing Amount"]);
    };

    useEffect(() => {
        if (data) {
            dispatch(setProposal(data.proposal));
        }
    }
    , [data]);

    useEffect(() => {
        !amount ? handlePageValidation() : setPageWarnings(null);
    }, [amount]);
    
    //TOdo: move budget loading to tableDisplay to localize the loading
    if (loading || budgetsLoading) return <CircularIndeterminate />;
    if (error) return toast.error("Failed to Load Proposal Details");
    
    let dataForItemCard = { "Goverance": data.proposal.space.name, "Total Budget": amount, "Proposal": data.proposal.title };

    //TODO: memoize this
    if (budgetList && budgetList.getBudgetsForProposal) {
        budgetList = transformItems(budgetList.getBudgetsForProposal, amount);
    } else if (budgetsError) {
        // Navigate to homepage if error code is 401
        if (budgetsError.networkError?.statusCode === 401) {
            toast.error("User session expired. Please re-connect in order to continue.");
        }
        return null; // Stop rendering rest of the component
    }

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
            label: "Export CSV",
            variant: "contained",
            onClick: handleExportCSV,
            innerText: "Export CSV",
            backgroundColor: "#282A2E",
            data: budgetList || [],
            filetype: "ProposalDetail"
        },
        {
            label: "Create Budget",
            variant: "contained",
            onClick: handlePageValidation || handleUpdateProposal,
            innerText: "Create Budget",
            disabled:( status || !amount),
            ml: "0.5rem",
            type: "link",
            to: status || !amount ? null  : `/proposal/update/${proposalId}`,
        }
    ];
    
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
                        )
                }
                {
                    pageWarnings && <SnackbarMessage severity="error" message={pageWarnings} open={pageWarnings ? true: false} />
                }
            </Box>
        </div>
    );
}

export default ProposalDetailView;
