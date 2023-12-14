const router = require("express").Router();
const axios = require("axios");

router.post("/tokenPrice", async (req, res) => {
  const { body } = req;
  
  try {
    const response = await axios.get(
      `https://api.1inch.dev/price/v1.1/1/${body.addresses}`,
      {
        params: {
          currency: "USD",
        },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_1INCH_API_KEY}`,
        },
      }
    );
    return res.status(200).json(response.data);
  }
  catch (e) {
    return res.status(500).json(e);
  }
});

router.get("/allowance", async (req, res) => {
    const { tokenAddress, walletAddress } = req.query;

    try {
        const response = await axios.get(
            `https://api.1inch.dev/swap/v5.2/1/approve/allowance?tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`,
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_1INCH_API_KEY}`,
                },
            }
        );
        res.send(response.data);
    } catch (e) {
        res.send(e);
    }
});

router.get("/approve", async (req, res) => {
    const { tokenOneAddress, amount } = req.query;

    try {
      const response = await axios.get(
        `https://api.1inch.dev/swap/v5.2/1/approve/transaction?tokenAddress=${tokenOneAddress}&amount=${Number(
          amount
        )}`,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_1INCH_API_KEY}`,
          },
        }
      );
      res.send(response.data);
    } catch (e) {
      res.send(e);
    }
});


router.get("/swap", async (req, res) => {
  const { fromTokenAddress, toTokenAddress, amount, address, slippage } =
    req.query;

  try {
    const response = await axios.get(
      `'https://api.1inch.dev/swap/v5.2/1/swap?src=${fromTokenAddress}&dst=${toTokenAddress}&amount=${tokenOneAmount.padEnd(
        tokenOne.decimals + tokenOneAmount.length,
        "0"
      )}&from=${address}&slippage=${slippage}`,
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_1INCH_API_KEY}`,
        },
      }
    );
    res.send(response.data);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
