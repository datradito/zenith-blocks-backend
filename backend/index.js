const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors')
const schema = require('./schema/schema');
var { graphqlHTTP } = require('express-graphql');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const { init } = require('./Database/sequalizeConnection');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

init();

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
