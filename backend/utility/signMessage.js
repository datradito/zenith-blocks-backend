const siwe = require('siwe');


const domain = "localhost";
const origin = "https://localhost:3000/login";
const redirect = "https://localhost:3000/proposals";
const config = {
    domain: "localhost",
    statement: "Sign this message to log in to our awesome dApp",
    origin: "https://localhost:3000/",
    uri: 'http://localhost:3000',
};
    
function createSiweMessage(address, network) {
    const siweMessage = new siwe.SiweMessage({
        address,
        network,
        chain: "1",
        version: '1',
        ...config,
    });
    
    return siweMessage.prepareMessage();
   
}


module.exports = createSiweMessage;