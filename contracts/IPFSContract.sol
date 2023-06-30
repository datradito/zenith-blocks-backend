pragma solidity ^0.8.0;

contract IPFSContract {
    struct Proposal {
        uint256 proposalId;
        uint256 daoId;
        string cid; // New field to store CID
    }

    struct IntegrationDetail {
        string cid; // New field to store CID
    }
    
    struct Dao {
        uint256 daoId;
        IntegrationDetail integrationDetail;
    }
    
    mapping(uint256 => Dao) public daos;
    mapping(uint256 => Proposal[]) public proposals;
    
    function setCIDForDao(uint256 _daoId, IntegrationDetail calldata _integrationDetail) public {
        Dao memory newDao = Dao(_daoId, _integrationDetail);
        daos[_daoId] = newDao;
    }
    
    function addProposal(uint256 _proposalId, string calldata _cid, uint256 _daoId) public {
        Proposal memory newProposal = Proposal(_proposalId, _daoId, _cid);
        proposals[_daoId].push(newProposal);
    }
    
    function setCIDForProposal(uint256 _daoId,uint256 _proposalId, string calldata _cid) public {
        for (uint i = 0; i < proposals[_daoId].length; i++) {
            if(proposals[_daoId][i].proposalId == _proposalId) {
                proposals[_daoId][i].cid = _cid;
            }
        }
    }
    
    function getCIDForProposal(uint256 _daoId, uint256 _proposalId) public view returns (string memory) {
        for (uint i = 0; i < proposals[_daoId].length; i++) {
            if (proposals[_daoId][i].proposalId == _proposalId) {
                return proposals[_daoId][i].cid;
            }
        }
    }
}
