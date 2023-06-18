var IPFSContract = artifacts.require("./IPFSContract.sol");

module.exports = function (deployer) {
    deployer.deploy(IPFSContract);
};