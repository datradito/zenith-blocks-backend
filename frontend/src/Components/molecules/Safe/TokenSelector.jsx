// TokenSelector.jsx
import { ethers } from "ethers";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TokenBalance from "./TokenBalance"; // import from correct path

const TokenSelector = ({
  erc20Balances,
  tokenAddress,
  setTokenAddress,
  safeBalance,
  chain,
}) =>

  Object.values(erc20Balances).length > 0 ? (
    <FormControl fullWidth variant="standard">
      <Select
        labelId="token-selector-label"
        id="token-selector"
        value={tokenAddress}
        label="Token"
        onChange={(event) => setTokenAddress(event.target.value)}
      >
        <MenuItem value={ethers.ZeroAddress}>
          {/* Safe Balance for native token */}
          <TokenBalance
            value={ethers.formatEther(safeBalance || "0")}
            tokenSymbol={chain?.token || ""}
          />
        </MenuItem>
        {Object.values(erc20Balances).map((erc20Balance) => (
          <MenuItem value={erc20Balance.address} key={erc20Balance.address}>
            {/* ERC20 Safe Balances */}
            <TokenBalance
              value={ethers.formatUnits(
                erc20Balance.balance || 0,
                erc20Balance.decimals
              )}
              tokenSymbol={erc20Balance.symbol}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <TokenBalance
      value={ethers.formatEther(safeBalance || "0")}
      tokenSymbol={chain?.token || ""}
    />
  );

export default TokenSelector;
