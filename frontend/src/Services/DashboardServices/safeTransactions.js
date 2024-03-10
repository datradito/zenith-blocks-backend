//TODO: Following is sample json transacitons returned from backend
//TODO: we need to parse these and return a generalized transaction model which can be used throughout the project
//TODO: without having to worry about the type of transaction

//         {
//             "safe": "0x58eEaD5B22Fc79B1F0b58Be44429337BB9a9700E",
//             "to": "0x58eEaD5B22Fc79B1F0b58Be44429337BB9a9700E",
//             "value": "0",
//             "data": "0xa9059cbb00000000000000000000000008b0973a4bf27ecb9487283864497b1e861b25bc0000000000000000000000000000000000000000000000000000000000000002",
//             "operation": 0,
//             "gasToken": "0x0000000000000000000000000000000000000000",
//             "safeTxGas": 0,
//             "baseGas": 0,
//             "gasPrice": "0",
//             "refundReceiver": "0x0000000000000000000000000000000000000000",
//             "nonce": 2,
//             "executionDate": null,
//             "submissionDate": "2024-03-05T23:10:01.800095Z",
//             "modified": "2024-03-05T23:10:02.006810Z",
//             "blockNumber": null,
//             "transactionHash": null,
//             "safeTxHash": "0x21ec8a16b1a5a7cd08d8a1cddf7059beae980df7265e6069d2cddb33dabf44b4",
//             "proposer": "0x715A21B7683f15FF5920689196AF0E8b68f990A7",
//             "executor": null,
//             "isExecuted": false,
//             "isSuccessful": null,
//             "ethGasPrice": null,
//             "maxFeePerGas": null,
//             "maxPriorityFeePerGas": null,
//             "gasUsed": null,
//             "fee": null,
//             "origin": "{}",
//             "dataDecoded": {
//                 "method": "transfer",
//                 "parameters": [
//                     {
//                         "name": "to",
//                         "type": "address",
//                         "value": "0x08B0973a4Bf27Ecb9487283864497B1e861b25bc"
//                     },
//                     {
//                         "name": "value",
//                         "type": "uint256",
//                         "value": "2"
//                     }
//                 ]
//             },
//             "confirmationsRequired": 2,
//             "confirmations": [
//                 {
//                     "owner": "0x715A21B7683f15FF5920689196AF0E8b68f990A7",
//                     "submissionDate": "2024-03-05T23:10:02.006810Z",
//                     "transactionHash": null,
//                     "signature": "0x9b1d693f8f024403e3c60f82a952beb791631248febccea2e63441bc18b2bffc11e8b2216b0cf36ca67cb1e93180541812f702e3edd3d8b2b2e79ed225e0ac0220",
//                     "signatureType": "ETH_SIGN"
//                 }
//             ],
//             "trusted": true,
//             "signatures": null,
//             "transfers": [],
//             "txType": "MULTISIG_TRANSACTION"
//         },
//         {
//             "safe": "0x58eEaD5B22Fc79B1F0b58Be44429337BB9a9700E",
//             "to": "0x08210F9170F89Ab7658F0B5E3fF39b0E03C594D4",
//             "value": "0",
//             "data": "0xa9059cbb0000000000000000000000006973e1339e0f5b27820890fe0ee3e26d0f89c47a00000000000000000000000000000000000000000000000000000000000f4240",
//             "operation": 0,
//             "gasToken": "0x0000000000000000000000000000000000000000",
//             "safeTxGas": 0,
//             "baseGas": 0,
//             "gasPrice": "0",
//             "refundReceiver": "0x0000000000000000000000000000000000000000",
//             "nonce": 1,
//             "executionDate": null,
//             "submissionDate": "2024-03-05T22:29:34.036102Z",
//             "modified": "2024-03-05T22:29:34.549324Z",
//             "blockNumber": null,
//             "transactionHash": null,
//             "safeTxHash": "0xd53a73ff181af083928f8b89252d630ad008781e1447737c4a6aab40c73fd363",
//             "proposer": "0x715A21B7683f15FF5920689196AF0E8b68f990A7",
//             "executor": null,
//             "isExecuted": false,
//             "isSuccessful": null,
//             "ethGasPrice": null,
//             "maxFeePerGas": null,
//             "maxPriorityFeePerGas": null,
//             "gasUsed": null,
//             "fee": null,
//             "origin": "{}",
//             "dataDecoded": {
//                 "method": "transfer",
//                 "parameters": [
//                     {
//                         "name": "to",
//                         "type": "address",
//                         "value": "0x6973e1339E0f5B27820890fe0eE3E26D0F89c47A"
//                     },
//                     {
//                         "name": "value",
//                         "type": "uint256",
//                         "value": "1000000"
//                     }
//                 ]
//             },
//             "confirmationsRequired": 2,
//             "confirmations": [
//                 {
//                     "owner": "0x715A21B7683f15FF5920689196AF0E8b68f990A7",
//                     "submissionDate": "2024-03-05T22:29:34.549324Z",
//                     "transactionHash": null,
//                     "signature": "0x203f8f5a2a7699510ffee0cbc980c8322679fa1ab6bb5a8cebed002c27d4f4f34a11e2b175378b59d2f22d8c9375babb0a41b026eb4ef98a5487c44838d010541b",
//                     "signatureType": "EOA"
//                 }
//             ],
//             "trusted": true,
//             "signatures": null,
//             "transfers": [],
//             "txType": "MULTISIG_TRANSACTION"
//         },
//         {
//             "safe": "0x58eEaD5B22Fc79B1F0b58Be44429337BB9a9700E",
//             "to": "0x58eEaD5B22Fc79B1F0b58Be44429337BB9a9700E",
//             "value": "0",
//             "data": null,
//             "operation": 0,
//             "gasToken": "0x0000000000000000000000000000000000000000",
//             "safeTxGas": 0,
//             "baseGas": 0,
//             "gasPrice": "0",
//             "refundReceiver": "0x0000000000000000000000000000000000000000",
//             "nonce": 0,
//             "executionDate": null,
//             "submissionDate": "2024-02-13T07:51:36.466050Z",
//             "modified": "2024-02-13T07:51:36.498434Z",
//             "blockNumber": null,
//             "transactionHash": null,
//             "safeTxHash": "0x114a6105d75e0dc065fef0b3d03fd7137c2c087ded61b35c2cdcae717f660b04",
//             "proposer": "0x715A21B7683f15FF5920689196AF0E8b68f990A7",
//             "executor": null,
//             "isExecuted": false,
//             "isSuccessful": null,
//             "ethGasPrice": null,
//             "maxFeePerGas": null,
//             "maxPriorityFeePerGas": null,
//             "gasUsed": null,
//             "fee": null,
//             "origin": "{\"url\": \"http://localhost:3002\", \"name\": \"Safe App Starter\"}",
//             "dataDecoded": null,
//             "confirmationsRequired": 2,
//             "confirmations": [
//                 {
//                     "owner": "0x715A21B7683f15FF5920689196AF0E8b68f990A7",
//                     "submissionDate": "2024-02-13T07:51:36.498434Z",
//                     "transactionHash": null,
//                     "signature": "0xcfbf4da75075c0a4cbaf3e5abb814ea8c6dba169a2d25ba15fc295ed8ea2df954830a0fb38ab2109b72c41ef6c72babd198ef34cb92febe1d7842758c8ab57f81c",
//                     "signatureType": "EOA"
//                 }
//             ],
//             "trusted": true,
//             "signatures": null,
//             "transfers": [],
//             "txType": "MULTISIG_TRANSACTION"
//         },
//         {
//             "executionDate": "2024-02-23T01:22:48Z",
//             "to": "0x08210F9170F89Ab7658F0B5E3fF39b0E03C594D4",
//             "data": "0xa9059cbb00000000000000000000000058eead5b22fc79b1f0b58be44429337bb9a9700e0000000000000000000000000000000000000000000000000000000000989680",
//             "txHash": "0xad1e98696b6109a17e24ea9d37f0f7e676823055661614a74fd73baeec57cf6a",
//             "blockNumber": 5344284,
//             "transfers": [
//                 {
//                     "type": "ERC20_TRANSFER",
//                     "executionDate": "2024-02-23T01:22:48Z",
//                     "blockNumber": 5344284,
//                     "transactionHash": "0xad1e98696b6109a17e24ea9d37f0f7e676823055661614a74fd73baeec57cf6a",
//                     "to": "0x58eEaD5B22Fc79B1F0b58Be44429337BB9a9700E",
//                     "value": "10000000",
//                     "tokenId": null,
//                     "tokenAddress": "0x08210F9170F89Ab7658F0B5E3fF39b0E03C594D4",
//                     "transferId": "ead1e98696b6109a17e24ea9d37f0f7e676823055661614a74fd73baeec57cf6a341",
//                     "tokenInfo": {
//                         "type": "ERC20",
//                         "address": "0x08210F9170F89Ab7658F0B5E3fF39b0E03C594D4",
//                         "name": "EURC",
//                         "symbol": "EURC",
//                         "decimals": 6,
//                         "logoUri": "https://safe-transaction-assets.safe.global/tokens/logos/0x08210F9170F89Ab7658F0B5E3fF39b0E03C594D4.png",
//                         "trusted": false
//                     },
//                     "from": "0x75C0c372da875a4Fc78E8A37f58618a6D18904e8"
//                 }
//             ],
//             "txType": "ETHEREUM_TRANSACTION",
//             "from": "0x75C0c372da875a4Fc78E8A37f58618a6D18904e8"
//         },
//         {
//             "executionDate": "2024-02-22T03:56:48Z",
//             "to": "0x58eEaD5B22Fc79B1F0b58Be44429337BB9a9700E",
//             "data": null,
//             "txHash": "0xf94e53419e0d6280745a7ecf7a65e316e7c3e18d71846d145152363c2579e73c",
//             "blockNumber": 5338471,
//             "transfers": [
//                 {
//                     "type": "ETHER_TRANSFER",
//                     "executionDate": "2024-02-22T03:56:48Z",
//                     "blockNumber": 5338471,
//                     "transactionHash": "0xf94e53419e0d6280745a7ecf7a65e316e7c3e18d71846d145152363c2579e73c",
//                     "to": "0x58eEaD5B22Fc79B1F0b58Be44429337BB9a9700E",
//                     "value": "59592030000000000",
//                     "tokenId": null,
//                     "tokenAddress": null,
//                     "transferId": "if94e53419e0d6280745a7ecf7a65e316e7c3e18d71846d145152363c2579e73c",
//                     "tokenInfo": null,
//                     "from": "0x715A21B7683f15FF5920689196AF0E8b68f990A7"
//                 }
//             ],
//             "txType": "ETHEREUM_TRANSACTION",
//             "from": "0x715A21B7683f15FF5920689196AF0E8b68f990A7"
//         }

class SafeTransactionsService {
  constructor(transaction) {
    this.transaction = transaction;
  }

  getTransfers() {
    let transfers;
    if (this.transaction.transfers) {
      transfers = this.transaction.transfers.map((transfer) => {
        return {
          type: transfer.type,
          executionDate: transfer.executionDate,
          blockNumber: transfer.blockNumber,
          transactionHash: transfer.transactionHash,
          to: transfer.to,
          value: transfer.value,
          tokenId: transfer.tokenId,
          tokenAddress: transfer.tokenAddress,
          transferId: transfer.transferId,
          tokenInfo: transfer.tokenInfo,
          from: transfer.from,
        };
      });
    }

    return transfers;
  }

  getTokenInfo() {
    if (this.transaction.type === "ERC20_TRANSFER") {
      return {
        ...this.transaction.tokenInfo,
        value: this.transaction.value,
      };
    } else if (this.transaction.type === "ETHER_TRANSFER") {
      return {
        ...null,
        value: this.transaction.value,
      };
    } else if (this.transaction?.transfers?.length > 0) {
      return {
        ...this.transaction.transfers[0].tokenInfo,
        value: this.transaction.transfers[0].value,
      };
    } else {
      return {
        ...this.transaction.tokenInfo,
        value: this.transaction.value,
      };
    }
  }

  sanitizeTransaction() {
    let from;
    let to;
    let value;
    let tokenInfo;
    let transfers;
    let executionDate;
    let txHash;
    let transactionType;
    let createdDate;

    if (this.transaction.txType === "MULTISIG_TRANSACTION") {
      from = this.transaction.proposer;
      to = this.transaction.to;
      value = this.transaction.value;

      createdDate = this.transaction.submissionDate;
      executionDate = this.transaction.executionDate;

      txHash = this.transaction.safeTxHash;
      transactionType = "Safe";
    } else if (
      this.transaction.txType === "ETHEREUM_TRANSACTION" ||
      this.transaction.type === "ERC20_TRANSFER" ||
      this.transaction.type === "ETHER_TRANSFER"
    ) {
      from = this.transaction.from;
      to = this.transaction.to;
      value = this.transaction.value;
      createdDate = this.transaction.executionDate;
      executionDate = this.transaction.executionDate;
      txHash = this.transaction.txHash;
      transactionType = "ERC20";
      transfers = this.getTransfers();
      tokenInfo = this.getTokenInfo();
    } else {
      from = this.transaction.from || this.transaction.safe;
      to = this.transaction.to;
    }

    const sanitizedTransaction = {
      type: transactionType,
      status: this.transaction.isSuccessful
        ? "Successful"
        : this.transaction.isExecuted
        ? "Executed"
        : this.transaction.executionDate
        ? "Success"
        : "Failed",
      createdDate: createdDate,
      executionDate: executionDate,
      from: from,
      to: to,
      value: value,
      tokenInfo: tokenInfo,
      transfers: transfers,
      txHash: txHash,
    };

    return sanitizedTransaction;
  }
}

export default SafeTransactionsService;
