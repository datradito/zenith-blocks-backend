import { ethers } from "ethers";

export const isAddressValid = (address) => {
    try {
        ethers.getAddress(address);
        return true;
    } catch (error) {
        return error.shortMessage;
    }
};
    