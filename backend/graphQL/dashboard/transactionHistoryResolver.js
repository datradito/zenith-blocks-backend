const { GraphQLError } = require("graphql");
const { transactionHistory } = require("../../utility/alchemyUtil/transferHistory");

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

module.exports = transactionHistoryResolver;