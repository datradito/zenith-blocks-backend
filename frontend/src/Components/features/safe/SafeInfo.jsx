import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Avatar, Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AddressLabel from "./AddressLabel.jsx";
import getSafeInfo from "../../../Services/Safe/getSafeInfo.js";
import usePolling from "../../hooks/Safe/usePolling.jsx";
import isContractAddress from "../../../Services/Safe/isContractAddress.js";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import useSafeStore from "../../../store/modules/safe/index.ts";
import useApi from "../../hooks/Safe/useApi.jsx";

import TokenBalance from "../../molecules/Safe/TokenBalance.jsx";


import { ethers } from "ethers";
import { useSafeProvider } from "../../../Services/Safe/SafeProvider.jsx";

// TODO: ADD USDC LABEL
// TODO: ADD CHAIN LABEL

function SafeInfo({ safeAddress, chainId }) {
  const safe = useSafeStore();
  const { erc20Balances, safeBalance, setTokenAddress, tokenAddress } =
    useSafeProvider();

  const [isDeployed, setIsDeployed] = useState(false);
  const [isDeployLoading, setIsDeployLoading] = useState(true);

  const getProvider = useCallback(() => {
    return new ethers.BrowserProvider(window.ethereum);
  }, []);

  const provider = getProvider();

  const detectSafeIsDeployed = useCallback(async () => {
    const isDeployed = await isContractAddress(safeAddress, provider);

    setIsDeployed(isDeployed);
    setIsDeployLoading(false);
  }, [provider, safeAddress]);

  usePolling(detectSafeIsDeployed);

  // safe info from Safe transaction service (used to know the threshold & owners of the Safe if its deployed)
  const fetchInfo = useCallback(
    (signal) => getSafeInfo(safeAddress, chainId, { signal }),
    [safeAddress, chainId]
  );

  const { data: safeInfo, isLoading: isGetSafeInfoLoading } = useApi(fetchInfo);
  useEffect(() => {
    if (safeInfo) {
      safe.setSafeOwners(safeInfo?.owners);
    }
  }, [safeInfo]);

  const owners = safeInfo?.owners.length || 1;
  const threshold = safeInfo?.threshold || 1;
  const isLoading = isDeployLoading || isGetSafeInfoLoading;


  return (
    <Stack direction="row" spacing={2} border="none">
      <div style={{ position: "relative" }}>
        {/* Safe Logo */}
        {isLoading ? (
          <Skeleton variant="circular" width={50} height={50} />
        ) : (
          <Avatar alt="connected Safe account logo" src=".jpg" height="50px" />
        )}

        {/* Threshold & owners label */}
        {isDeployed && (
          <Tooltip title="Threshold / Owners">
            <SafeSettingsLabel>
              <Typography
                fontSize="12px"
                fontWeight="700"
                color="inherit"
                lineHeight="initial"
              >
                {threshold}/{owners}
              </Typography>
            </SafeSettingsLabel>
          </Tooltip>
        )}
      </div>

      <Stack
        direction="column"
        spacing={0.5}
        alignItems="flex-start"
        border="none"
      >
        {/* Safe address label */}
        <Typography variant="body2">
          <AddressLabel address={safeAddress} showBlockExplorerLink />
        </Typography>

        {isLoading && <Skeleton variant="text" width={110} height={20} />}

        {!isDeployed && !isDeployLoading && (
          <CreationPendingLabel>
            <Tooltip title="This Safe is not deployed yet, it will be deployed when you execute the first transaction">
              <Typography fontWeight="700" fontSize="12px" color="inherit">
                Creation pending
              </Typography>
            </Tooltip>
          </CreationPendingLabel>
        )}

        {!isLoading && (
          <>
            {Object.values(erc20Balances).length > 0 ? (
              <FormControl fullWidth variant="standard">
                <Select
                  labelId="token-selector-label"
                  id="token-selector"
                  value={tokenAddress}
                  label="Token"
                  onChange={(event) =>
                    setTokenAddress(event.target.value)
                  }
                >
                  <MenuItem value={ethers.ZeroAddress}>
                    {/* Safe Balance for native token */}
                    <TokenBalance
                      value={ethers.formatEther(safeBalance || '0')}
                      tokenSymbol={safe.chain?.token || ''}
                    />
                  </MenuItem>
                  {Object.values(erc20Balances).map((erc20Balance) => (
                    <MenuItem value={erc20Balance.address} key={erc20Balance.address}>
                      {/* ERC20 Safe Balances */}
                      <TokenBalance
                        value={ethers.formatUnits(erc20Balance.balance || 0, erc20Balance.decimals)}
                        tokenSymbol={erc20Balance.symbol}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TokenBalance
                value={ethers.formatEther(safeBalance || '0')}
                tokenSymbol={safe.chain?.token || ''}
              />
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default SafeInfo;

const SafeSettingsLabel = styled("div")(
  ({ theme }) => `
  position: absolute;
  top: -6px;
  right: -4px;
  border-radius: 50%;
  background-color: ${theme.palette.secondary.light};
  color: ${theme.palette.getContrastText(theme.palette.secondary.light)};
  padding: 5px 6px;
`
);

const CreationPendingLabel = styled("div")(
  ({ theme }) => `
  border-radius: 4px;
  background-color: ${theme.palette.info.light};
  color: ${theme.palette.getContrastText(theme.palette.secondary.light)}; 
  padding: 0px 10px;
`
);
