// pragma solidity ^0.8.0;

// contract IPFSContract {
//     struct Budget {
//         uint256 id;
//         string cid;
//         uint256 daoId;
//     }
    
//     struct Invoice {
//         uint256 id;
//         string cid;
//         uint256 budgetId;
//     }
    
//     struct Dao {
//         uint256 daoId;
//         string cid;
//     }
    
//     mapping(address => mapping(uint256 => Budget[])) public daoBudgets;
//     mapping(address => mapping(uint256 => Invoice[])) public budgetInvoices;
    
//     mapping(address => Dao[]) public customerDaos;
    
//     function addBudget(uint256 _daoId, string memory _cid, uint256 _budgetId) public returns (string memory) {
//         Budget memory newBudget = Budget(_budgetId, _cid, _daoId);
//         daoBudgets[msg.sender][_daoId].push(newBudget);
//         return _cid;
//     }
    
//     function addInvoice(uint256 _budgetId, string memory _cid, uint256 _invoiceId) public returns (string memory) {
//         Invoice memory newInvoice = Invoice(_invoiceId, _cid, _budgetId);
//         budgetInvoices[msg.sender][_budgetId].push(newInvoice);
//         return _cid;
//     }
    
//     function addDao(uint256 _daoId, string memory _cid) public returns (string memory) {
//         Dao memory newDao = Dao(_daoId, _cid);
//         customerDaos[msg.sender].push(newDao);
//         return _cid;
//     }
    
//     function getBudgets(address _customer, uint256 _daoId) public view returns (string[] memory) {
//         Budget[] memory budgets = daoBudgets[_customer][_daoId];
//         string[] memory cids = new string[](budgets.length);
        
//         for (uint256 i = 0; i < budgets.length; i++) {
//             cids[i] = budgets[i].cid;
//         }
        
//         return cids;
//     }
    
//     function getInvoices(address _customer, uint256 _budgetId) public view returns (string[] memory) {
//         Invoice[] memory invoices = budgetInvoices[_customer][_budgetId];
//         string[] memory cids = new string[](invoices.length);
        
//         for (uint256 i = 0; i < invoices.length; i++) {
//             cids[i] = invoices[i].cid;
//         }
        
//         return cids;
//     }
    
//     function getDaos(address _customer) public view returns (string[] memory) {
//         Dao[] memory daos = customerDaos[_customer];
//         string[] memory cids = new string[](daos.length);
        
//         for (uint256 i = 0; i < daos.length; i++) {
//             cids[i] = daos[i].cid;
//         }
        
//         return cids;
//     }
    
//     function modifyCIDForBudget(uint256 _daoId, uint256 _budgetId, string memory _newCID) public {
//         Budget[] storage budgets = daoBudgets[msg.sender][_daoId];
        
//         for (uint256 i = 0; i < budgets.length; i++) {
//             if (budgets[i].id == _budgetId) {
//                 budgets[i].cid = _newCID;
//                 break;
//             }
//         }
//     }
    
//     function modifyCIDForInvoice(uint256 _budgetId, uint256 _invoiceId, string memory _newCID) public {
//         Invoice[] storage invoices = budgetInvoices[msg.sender][_budgetId];
        
//         for (uint256 i = 0; i < invoices.length; i++) {
//             if (invoices[i].id == _invoiceId) {
//                 invoices[i].cid = _newCID;
//                 break;
//             }
//         }
//     }
    
//     function modifyCIDForDao(uint256 _daoId, string memory _newCID) public {
//         Dao[] storage daos = customerDaos[msg.sender];
        
//         for (uint256 i = 0; i < daos.length; i++) {
//             if (daos[i].daoId == _daoId) {
//                 daos[i].cid = _newCID;
//                 break;
//             }
//         }
//     }
// }




pragma solidity ^0.8.0;

contract IPFSContract {
    struct Proposal {
        uint256 proposalId;
        string value;
        string cid; // New field to store CID
    }

    struct IntegrationDetail {
        string cid; // New field to store CID
    }
    
    struct Dao {
        uint256 daoId;
        IntegrationDetail integrationDetail;
        Proposal[] proposals;
    }
    
    mapping(uint256 => Dao) public daos;
    
    function createDao(uint _daoId, IntegrationDetail memory _integrationDetail, string memory _cid) public {
        Dao memory newDao = Dao(_daoId, _integrationDetail, new Proposal[](0));
        daos[_daoId] = newDao;
    }
    
    function addProposal(uint256 _proposalId, string memory _value, string memory _cid, uint256 _daoId) public {
        Dao storage dao = daos[_daoId];
        Proposal memory newProposal = Proposal(_proposalId, _value, _cid);
        dao.proposals.push(newProposal);
    }
    
    function getProposal(uint _daoId, uint256 _proposalId) public view returns (string memory, string memory) {
        Dao storage dao = daos[_daoId];
        
        for (uint256 i = 0; i < dao.proposals.length; i++) {
            if (dao.proposals[i].proposalId == _proposalId) {
                return (dao.proposals[i].value, dao.proposals[i].cid);
            }
        }
        
        revert("Proposal not found");
    }
    
    // function getCIDForDao(uint256 _daoId) public view returns (string memory) {
    //     return daos[_daoId];
    // }
    
    // function setCIDForDao(uint256 _daoId, string memory _cid) public {
    //     daos[_daoId].cid = _cid;
    // }
    
    function setCIDForProposal(uint256 _daoId, uint256 _proposalId, string memory _cid) public {
        Dao storage dao = daos[_daoId];
        
        for (uint256 i = 0; i < dao.proposals.length; i++) {
            if (dao.proposals[i].proposalId == _proposalId) {
                dao.proposals[i].cid = _cid;
                break;
            }
        }
    }
    
    function getCIDForProposal(uint256 _daoId, uint256 _proposalId) public view returns (string memory) {
        Dao storage dao = daos[_daoId];
        
        for (uint256 i = 0; i < dao.proposals.length; i++) {
            if (dao.proposals[i].proposalId == _proposalId) {
                return dao.proposals[i].cid;
            }
        }
        
        revert("Proposal not found");
    }
}
