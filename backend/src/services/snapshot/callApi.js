import axios from "axios";

export const callExternalGraphQLAPI = async (url,query, variables) => {
  try {
    const response = await axios.post(url, {
      query,
      variables,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.errors[0].message);
  }
};
