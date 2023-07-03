pragma solidity ^0.8.0;

contract IPFSContract {
    struct Proposal {
        string proposalId;
        string daoId;
        string cid;
    }

    struct IntegrationDetail {
        string cid; // New field to store CID
    }

    struct Budget {
        string proposalId;
        string budgetId;
        string cid;
    }

    struct Dao {
        string daoId;
        IntegrationDetail integrationDetail;
    }

    //daoid => dao
    mapping(string => Dao) public daos;
    //daoId => proposal[]
    mapping(string => Proposal) public proposals;
    //proposalId => budget[]
    mapping(string => Budget[]) public budgets;

    function setCIDForDao(
        string calldata _daoId,
        IntegrationDetail calldata _integrationDetail
    ) public {
        Dao memory newDao = Dao(_daoId, _integrationDetail);
        daos[_daoId] = newDao;
    }

    function addProposal(
        string memory _proposalId,
        string calldata _cid,
        string calldata _daoId
    ) public view {
        // string memory proposalId = keccak256(_proposalId);
        // require(proposals[proposalId] == proposalId, "Proposal already exists");
        // Proposal(_proposalId, _daoId, _cid);
    }

    //use it when data for proposal like budget is set initially
    function setCIDForProposal(
        string calldata _daoId,
        string calldata _proposalId,
        string calldata _cid
    ) public {
        // for (uint i = 0; i < proposals[_daoId].length; i++) {
        //     if(proposals[_daoId][i].proposalId == _proposalId) {
        //         proposals[_daoId][i].cid = _cid;
        //     }
        // }
    }

    //use it to populate budget field for proposal
    function getCIDForProposal(
        string calldata _daoId,
        string calldata _proposalId
    ) public view returns (string memory _cid) {
        // for (uint i = 0; i < proposals[_daoId].length; i++) {
        //     if (proposals[_daoId][i].proposalId == _proposalId) {
        //         return proposals[_daoId][i].cid;
        //     }
        // }
    }

    function setBudgetsHash(
        string calldata _proposalId,
        string calldata _budgetId,
        string calldata _cid
    ) public {
        Budget[] storage proposalBudgets = budgets[_proposalId];
        Budget memory newBudget = Budget(_proposalId, _budgetId, _cid);
        proposalBudgets.push(newBudget);
    }

    //use it get all the hashes for proposal's budgets
    function getProposalBudgets(
        string calldata proposalId
    ) public view returns (Budget[] memory) {
        return budgets[proposalId];
    }
}
