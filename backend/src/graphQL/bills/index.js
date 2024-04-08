const billsResolver = {
  Query: {
    getBillsByAddress: async (parent, { addressId = "" }) => {},
  },
  Mutation: {
    createBillByAddress: async (parent, { addressId = "" }) => {},
  },
};

export default billsResolver;
