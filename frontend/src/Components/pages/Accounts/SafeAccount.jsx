import React from "react";
import SafeInfo from "./SafeInfo";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AddressLabel from "./AddressLabel";
import styled from "styled-components";

import { useAccountAbstraction } from "../../../Utility/Providers/AccountAbstractionContext";
import { InputLabel, Box } from "@mui/material";
import Button from "../../atoms/Button/Button";
import { message } from "antd";
import Label from "../../atoms/Label/Label";

export const ConnectedContainer = styled(Box)(
  ({ theme }) => `
  border-radius: 10px;
  padding: 40px 32px;  
`
);

function SafeAccount(props) {
  const {
    safeSelected,
    chainId,
    safes,
    hasLoadedSafes,
    setHasLoadedSafes,
    setSafeSelected,
    getSafesOwned,
  } = useAccountAbstraction();

  const handleLoadSafes = async () => {
    await getSafesOwned();
    setHasLoadedSafes(true);
  };

  const createSafe = async () => {
    message.info("Create Safe Logic");
  };

  return (
    <ConnectedContainer {...props}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {!hasLoadedSafes ? (
          <Button variant="contained" onClick={handleLoadSafes}>
            Load Safes
          </Button>
        ) : safes.length === 0 && hasLoadedSafes ? (
          <>
            <Label>No Safe Found</Label>
            <Button variant="contained" onClick={createSafe}>
              Create Safe
            </Button>
          </>
          ) : (
              <>
              </>
          // <AddressLabel address={safeSelected} />
        )}
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
