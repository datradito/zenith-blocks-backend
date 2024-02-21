import Typography from "@mui/material/Typography";
import SafeInfo from "./SafeInfo";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AddressLabel from "./AddressLabel";
import styled from "styled-components";

import { useAccountAbstraction } from "../../../Utility/Providers/AccountAbstractionContext";
import { InputLabel, Box } from "@mui/material";
import { useEffect } from "react";
import Button from "../../atoms/Button/Button";

export const ConnectedContainer = styled(Box)(
  ({ theme }) => `
  border-radius: 10px;
  padding: 40px 32px;  
`
);

function SafeAccount(props) {
  const { safeSelected, chainId, safes, setSafeSelected, getSafesOwned } =
    useAccountAbstraction();

  useEffect(() => {
    if (safes && safes.length > 0) {
      console.log(safes);
    }
  }, [safes, safeSelected]);

  useEffect(() => {
    if (safes.length === 1) {
      setSafeSelected(safes[0]);
      localStorage.setItem("selectedSafe", safes[0]);
    }
  }
  , [safes, setSafeSelected]);

  return (
    <ConnectedContainer {...props}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography fontWeight="700">Safe Account</Typography>
          <Typography fontSize="14px" marginTop="8px" marginBottom="32px">
            Your Safe account (Smart Contract) holds and protects your assets.
          </Typography>
        </Box>
        {
          safes.length === 0 ?
          <Button variant="contained" onClick={getSafesOwned}>
          Load Safes
            </Button>
            :
            <AddressLabel address={safes[0]} />
        }
      </Box>

      {!!safes && safes.length > 1 && (
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel id="switch-address-selector-label">
            Select Safe
          </InputLabel>
          <Select
            color="success"
            aria-label="safe address selector"
            id="switch-address-selector"
            labelId="switch-address-selector-label"
            defaultValue={safes[0] || "Select Safe"}
            value={safeSelected}
            onChange={(event) =>
              setSafeSelected(event.target.value) &&
              localStorage.setItem("selectedSafe", event.target.value)
            }
          >
            {safes.map((safeAddress) => (
              <MenuItem
                key={safeAddress}
                value={safeAddress}
                onClick={() =>
                  setSafeSelected(safeAddress) &&
                  localStorage.setItem("selectedSafe", safeAddress)
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <AddressLabel address={safeAddress} />
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Safe Info */}
      {safeSelected && (
        <SafeInfo safeAddress={safeSelected} chainId={chainId} />
      )}
    </ConnectedContainer>
  );
}

export default SafeAccount;
