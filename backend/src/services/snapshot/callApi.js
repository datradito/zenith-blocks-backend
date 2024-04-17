import axios from "axios";
import { query } from "./query.js";

export const callApi = async (url, method, data) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const callExternalGraphQLAPI = async (url, variables) => {
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
