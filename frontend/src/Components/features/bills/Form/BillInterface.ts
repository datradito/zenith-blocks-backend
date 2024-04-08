interface MultiSigInfo {
  from: string;
  safeTxHash: string;
  sender: string;
  confirmationsRequired: number;
  confirmations: Array<Confirmations>;
  signatures: null;
  transfers: [];
}

interface Confirmations {
  owner: string;
  submissionDate: string;
  transactionHash: null | string;
  signature: string;
  signatureType: string;
}

interface ERC20Info {}

interface EtherTxInfo {}
