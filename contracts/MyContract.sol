pragma solidity ^0.8.19;

contract MyContract {
  address[] private permittedAddresses;
  //permittedAddresses[0] = "0x715a21b7683f15ff5920689196af0e8b68f990a7";

  // constructor(address[] memory _permittedAddresses) {
  //   permittedAddresses = _permittedAddresses;
  // }

// ToDo: this method controls the paid version! Remember to modify as needed!
  function setAddress() public  {
    for (uint256 i = 0; i < permittedAddresses.length; i++) {
      if (permittedAddresses[i] == msg.sender) {
        return;
      } 
    }
    permittedAddresses.push(msg.sender);
  }

  function getAddresses() public view returns (address[] memory) {
    return permittedAddresses;
  }

  modifier onlyPermitted() {
    bool isPermitted = false;
    for (uint256 i = 0; i < permittedAddresses.length; i++) {
      if (permittedAddresses[i] == msg.sender) {
        isPermitted = true;
        break;
      }
    }
    require(isPermitted, "Only permitted addresses allowed");
    _;
  }

  // Function that can only be accessed by permitted addresses
  function isUserAllowed() public view returns(bool isPermitted)  {
      isPermitted = false;
      for (uint256 i = 0; i < permittedAddresses.length; i++) {
        if (permittedAddresses[i] == msg.sender) {
          isPermitted = true;
          return isPermitted;
        }
    }
  }
}
