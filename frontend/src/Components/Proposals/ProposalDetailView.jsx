import React, { useEffect, useState } from 'react'
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
import useWeb3IpfsContract from '../hooks/web3IPFS';
import { aesEncryptToBytes32, aesDecryptFromBytes32, encryptionKey, iv } from '../../Utility/Logical/stringToBytes.js';


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
    const { action, ...rest } = item;
    return { ...rest, Remaining: parseInt(totalBudget - parseInt(item["Allocated Budget"])), Invoices: 'INVOICE' };
}

const headers = ["Categories", "Allocated Budget", "Currency", "Breakdown", "Remaining", "Invoices"]

function ProposalDetailView() {
    const { proposalId } = useParams();
    const dispatch = useDispatch();
    const [budgetList, setBudgetList] = useState(null);
    const { web3, contract } = useWeb3IpfsContract();
    const [budgetHashes, setBudgetHashes] = useState([]);
    const [budgetsLoading, setbudgetsLoading] = useState(true);

    const fetchBudgetDataForCurrentProposal = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch budget data');
        }
    };

    const fetchAndTransformBudgets = async (budgetHashes) => {
        const transformedItems = [];

        for (const budgetHash of budgetHashes) {
            try {
                const data = await fetchBudgetDataForCurrentProposal(budgetHash);
                const transformedItem = transformItems(data, 500);
                transformedItems.push(transformedItem);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        return transformedItems;
    };

    useEffect(() => {
        const initialize = async () => {
            if (budgetHashes.length === 0 && contract) {
                try {
                    setbudgetsLoading(true);
                    await refreshBudgetList(contract);
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setbudgetsLoading(false);
                }
            }
        };

        initialize();
    }, [contract]);

    const refreshBudgetList = async (contract) => {
        try {
            const decryptedProposalId = web3.utils.keccak256(web3.utils.fromAscii(proposalId));
            const result = await contract.methods.getCidsFromProposal(decryptedProposalId).call();
            setBudgetHashes(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (budgetHashes.length > 0) {
                setbudgetsLoading(true);
                const data = await fetchAndTransformBudgets(budgetHashes);
                setBudgetList(data);
                setbudgetsLoading(false);
            }
        };

        fetchData();
    }, [budgetHashes]);

    // useEffect(() => {
    //     const handleBudgetCreatedOrUpdated = async (event) => {
    //         const { _proposalId, _budgetId, _cid } = event.returnValues;
    //         if (_proposalId === proposalId) {
    //             try {
    //                 const response = await axios.get(_cid);
    //                 const transformedItem = transformItems(response.data, 500);
    //                 setBudgetList((prevBudgetList) => [...prevBudgetList, transformedItem]);
    //             } catch (error) {
    //                 console.error('Error:', error);
    //             }
    //         }
    //     };

    //     if (contract) {
    //         contract.events.BudgetCreatedOrUpdated()
    //             .on("data", handleBudgetCreatedOrUpdated)
    //             .on("error", (error) => {
    //                 console.error("Error listening to BudgetCreatedOrUpdated event:", error);
    //             });

    //         console.log(contract)

    //         setbudgetsLoadingContract(false);
    //         return () => {
    //             contract.events.BudgetCreatedOrUpdated().off("data", handleBudgetCreatedOrUpdated);
    //         };
    //     }

    // }, [contract]);

    //add loader to ensure contract is not null, and show loader until contract getting set up.

    let { loading, error, data } = useQuery(GET_PROPOSAL_BY_ID, {
        variables: { id: proposalId },
    });

    // if(loadingContract) return <CircularIndeterminate />;
    if (loading || budgetsLoading) return <CircularIndeterminate />;
    if (error) return <p>Error : {error.message}</p>;

    let dataForItemCard = { "Goverance": data.proposal.space.name, "Total Budget": 800, "Proposal": data.proposal.title };

    const handleExportCSV = () => {
        console.log("Export CSV");
    };

    const handleUpdateProposal = async () => {
        dispatch(setProposal(data.proposal));
    };

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
                )}
            </Box>
        </div>
    );
}

export default ProposalDetailView;
