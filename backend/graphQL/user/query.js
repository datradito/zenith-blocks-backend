const UserType = require('./typeDefs');
const User = require('../../Database/models/User');

const getDaoIdByAddress = {
    type: UserType,
    args: { address: { type: GraphQLString } },
    resolve(parent, args) {
        return User.findOne({ where: { address: args.address } })
    }
}


module.exports = {
    getDaoIdByAddress,
}