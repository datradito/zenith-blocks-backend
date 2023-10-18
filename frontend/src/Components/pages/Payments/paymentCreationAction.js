import { client } from "../../../apolloConfig/client";
import { SUBMIT_PAYMENT } from "../../../ServerQueries/Payment/Queries";

export const paymentAction = async (payment) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: SUBMIT_PAYMENT,
      variables: { payment },
    });

    return { data, errors, loading: false };
  } catch (error) {
    console.error("Mutation error", error);
    return { data: null, errors: [error], loading: false };
  }
};