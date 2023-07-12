var BudgetContract = artifacts.require("./BudgetContract.sol");

module.exports = function (deployer) {
    deployer.deploy(BudgetContract);
};