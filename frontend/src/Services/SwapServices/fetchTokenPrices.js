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

export default fetchTokenPrices;
