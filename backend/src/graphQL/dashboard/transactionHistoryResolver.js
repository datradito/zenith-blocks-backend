import { GraphQLError } from "graphql";
import { transactionHistory } from "../../utility/alchemyUtil/transferHistory.js";
const transactionHistoryResolver = {
    Query: {
        getTokenTransactionHistory: async (_, { address }) => {
            try {
                const data = await transactionHistory(address);
                console.log(data);
                return data;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        }
    }
};

export default transactionHistoryResolver;