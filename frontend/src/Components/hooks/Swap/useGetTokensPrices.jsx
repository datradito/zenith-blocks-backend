import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTokenPrices = async (addresses) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/tokenPrice`,
      {
        addresses,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching token prices from backend", error);
    throw error;
  }
};



const useGetTokensPrices = (addresses, fetchPrice) => {

  console.log(fetchPrice)

        const { data, isLoading, isError, refetch } = useQuery(
            ["tokenPrices", addresses],
          () => fetchTokenPrices(addresses),
          {
            enabled: fetchPrice,
          }    
        );
  
        return {
            data,
            isLoading,
          isError,
            refetch
        };
};

export default useGetTokensPrices;
