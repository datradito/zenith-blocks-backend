//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract BudgetContract{
    event BudgetCreatedOrUpdated(bytes32 proposalId, bytes32 budgetId, string cid);

    struct Budget{
        bytes32 proposalId;
        bytes32 budgetId;
        string cid;
    }

    // Budget[] public budgets;
    mapping(bytes32 => Budget) public budgetsMap;
    mapping(bytes32 => Budget[]) public proposalToBudget;
    mapping(bytes32 => bytes32) public budgetToCid;

    function createBudget(bytes32 _proposalId, bytes32 _budgetId, string memory _cid) public {
        // budgets.push(Budget(_proposalId, _budgetId, _cid));
        budgetsMap[_budgetId] = Budget(_proposalId, _budgetId, _cid);
        proposalToBudget[_proposalId].push(budgetsMap[_budgetId]);
        emit BudgetCreatedOrUpdated(_proposalId, _budgetId, _cid);
    }


    function getBudget(bytes32 _budgetId) public view returns(string memory) {
        return budgetsMap[_budgetId].cid;
    }

    function setBudget(bytes32 _budgetId, bytes32 _cid) public{
        budgetToCid[_budgetId] = _cid;
    }
    function getBudgetToCid(bytes32 _budgetId) public view returns(bytes32) {
        return budgetToCid[_budgetId];
    }

    function getCidsFromProposal(bytes32 _proposalId) public view returns (string[] memory) {
        Budget[] storage budgets = proposalToBudget[_proposalId];
        string[] memory cids = new string[](budgets.length);

        for (uint256 i = 0; i < budgets.length; i++) {
            cids[i] = budgets[i].cid;
        }

        return cids;
    }
}