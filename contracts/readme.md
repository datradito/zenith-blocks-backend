# List of Contracts

# 1 ManageCategories.sol
    This contract is responisble for saving the category hash. Categories are used when populating budget creation forms.

    Methods:
        setCategoryFileHash
        getCategoryHash
    Modifiers:
        internal private
    File saved to ipfs have following fields:-
        categoryId
        categoryName (limit characters)
        userAddress
        timestamp
        spaceId

# 2 manageBudgets.sol
    This contract is responsible for saving hash for all budgets created previously for a given proposal.

    Methods:
        setCategoryFileHash
        getCategoryHash
    Modifiers:
        internal private
    File saved to ipfs have following fields:-
        proposalId
        spaceName
        spaceId
        budgetId,
        categoryId,
        userid/userAddress

# 3 managePaidCustomers.sol
    This contract is responsible for saving all permitted users who can create invoices,categories,payments against a proposals

    Struct: 
        mapping(spaceId => Addresses[]) public address;
    getSubscribedAddressesBySpace()
    setSubscribedAddressesBySpace(address)

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
  function myFunction() external onlyPermitted {
    // Function code here
  }

    File Saved to ipfs have following fields:-
        spaceId -> array of permitted Addresses

