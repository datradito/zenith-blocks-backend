import Moralis from "moralis";

export const tokenTransfers = (req, res) => {

    try {
        const { address, chain } = req.query;

        const response = await Moralis.EvmApi.token.getWalletTokenTransfers({
          address: address,
          chain: chain,
        });
    
        const userTrans = response.data.result;
    
        let userTransDetails = [];
    
        for (let i = 0; i < userTrans.length; i++) {
          try {
            const metaResponse = await Moralis.EvmApi.token.getTokenMetadata({
              addresses: [userTrans[i].address],
              chain: chain,
            });
            if (metaResponse.data) {
              userTrans[i].decimals = metaResponse.data[0].decimals;
              userTrans[i].symbol = metaResponse.data[0].symbol;
              userTransDetails.push(userTrans[i]);
            } else {
              console.log("no details for coin");
            }
          } catch (e) {
            console.log(e);
          }
        }
        res.send(userTransDetails);
      } catch (e) {
        res.send(e);
      }
}