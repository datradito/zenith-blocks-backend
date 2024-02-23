const isContractAddress = async (address, provider) => {
  try {
    const code = await provider?.getCode(address);

    return code !== "0x";
  } catch (error) {
    console.error("Error checking if address is a contract", error);
    return false;
  }
};

export default isContractAddress;
