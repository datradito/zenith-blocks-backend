import React, { useEffect } from 'react'
import SubHeader from "../../molecules/SubHeader/SubHeader"
import { Box, Stack } from '@mui/material';
import ItemCard from "../../atoms/ItemCard/ItemCard";
import TableDisplay from "../../DisplayElements/TableDisplay";
import { parseInvoiceUrl } from '../../../Utility/parseInvoiceUrl';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useWeb3IpfsContract from '../../hooks/web3IPFS';
const tableHeaderData = ["Invoice", "Receipient", "Amount", "Currency", "Status", "Date", "Due","View", "Payment", "Action"]
const tableBodyData = [
    { id: 1, Invoice: 1234, Receipient: "John Doe", Amount: 50000, Currenyc: 'ETH', Status: 'PAID', Date: '03/01/2023', Due: '03/01/2023', View: 'INVOICE', Payment: 'PAID', Action: 'ACTION', budgetId: "123" },
    { id: 1, Invoice: 1234, Receipient: "John Doe", Amount: 50000, Currenyc: 'ETH', Status: 'PAID', Date: '03/01/2023', Due: '03/01/2023', View: 'INVOICE', Payment: 'PAID', Action: 'ACTION' },
    { id: 1, Invoice: 1234, Receipient: "John Doe", Amount: 50000, Currenyc: 'ETH', Status: 'UNPAID', Date: '03/01/2023', Due: '03/01/2023', View: 'INVOICE', Payment: 'PAID', Action: 'ACTION' },
    { id: 1, Invoice: 1234, Receipient: "John Doe", Amount: 50000, Currenyc: 'ETH', Status: 'PAID', Date: '03/01/2023', Due: '03/01/2023', View: 'INVOICE', Payment: 'PAID', Action: 'ACTION' }
]; 

function InvoiceListView() {
    let location = useLocation();
    let { proposal } = useSelector(state => state.currentProposal);
    let { id } = useSelector(state => state.currentBudget);
    const { web3, contract } = useWeb3IpfsContract();

    let [invoices, setInvoices] = useState([]);


    //step 1 - For Budget Id -> check in smartContract if it exists , if it does not render create invoices page
    if (parseInvoiceUrl(location.pathname) !== null) {
        let budgetId = parseInvoiceUrl(location.pathname);
        console.log(budgetId);
    }

    const getInvoicesCid = async (contract, budgetId) => {
        try {
            const decryptedbudgetId = web3.utils.keccak256(web3.utils.fromAscii(budgetId));
            const result = await contract.methods.getInvoicesCidFromBudget(decryptedbudgetId).call();
            console.log(result);
            // setBudgetHashes(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                to: '/proposal/budgets/createinvoice',
                // subButton: {
                //     label: "V",
                //     innerText: "View Proposal",
                //     type: "link",
                //     to: `/proposals`,
                //     message: "Proposal Saved Successfully",
                // }
            }
        ];
    
    const dataForItemCard = { "Goverance": proposal.space, "Total Budget": "$5,980,000", "Proposal": proposal.title };

    const BoxStyle = {
        width: '90%',
        margin: '0rem auto',
        textAlign: "center",
        color: 'white',
        border: ".05rem #2c2c2c solid",
        marginTop: "1rem",
        borderRadius: 3
    };
    
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
                  tableBodyData={tableBodyData}
                  dataToDisplay={[]}
              />
          </Box>
      </div>
  )
}

export default InvoiceListView