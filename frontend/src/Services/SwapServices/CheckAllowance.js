import axios from "axios";
import { useQuery } from "@tanstack/react-query"

const checkTokenAllowance = async (tokenAddress, walletAddress) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/allowance`,
      {
        params: { tokenAddress, walletAddress },
      }
    );
    return response.data;
  } catch (error) {
    // Handle errors appropriately (e.g., throw, log, etc.)
    throw new Error("Failed to fetch allowance");
  }
};

export default checkTokenAllowance;

