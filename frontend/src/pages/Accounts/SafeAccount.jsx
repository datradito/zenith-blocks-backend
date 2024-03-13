import React from "react";
import SafeInfo from "../../components/features/safe/SafeInfo.jsx";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AddressLabel from "../../components/features/safe/AddressLabel.jsx";
import styled from "styled-components";
import useSafeStore from "../../store/modules/safe/index.ts";
import { InputLabel, Box } from "@mui/material";
import Button from "../../components/atoms/Button/Button";
import { message } from "antd";
import Label from "../../components/atoms/Label/Label";

export const ConnectedContainer = styled(Box)(
  ({ theme }) => `
  border-radius: 10px;
  padding: 40px 32px;  
`
);

function SafeAccount(props) {
  const safe = useSafeStore();

  const handleLoadSafes = async () => {
    await safe.setSafeApiKit(safe.chainId);
    await safe?.getSafesOwned();
  };

  const createSafe = async () => {
    message.info("Create Safe Logic");
  };

  return (
    <ConnectedContainer {...props}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {!safe?.hasLoadedSafes ? (
          <Button variant="contained" onClick={handleLoadSafes}>
            Load Safes
          </Button>
        ) : safe.safes.length === 0 && safe.hasLoadedSafes ? (
          <>
            <Label>No Safe Found</Label>
            <Button variant="contained" onClick={createSafe}>
              Create Safe
            </Button>
          </>
        ) : (
          <></>
        )}
      </Box>

      {!safe.safeSelected && safe.safes.length >= 1 && (
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel id="switch-address-selector-label">
            Select Safe
          </InputLabel>

          <Select
            color="success"
            aria-label="safe address selector"
            id="switch-address-selector"
            labelId="switch-address-selector-label"
            defaultValue={safe.safes[0] || "Select Safe"}
            value={safe.safeSelected}
          >
            {safe.safes.map((safeAddress) => (
              <MenuItem
                key={safeAddress}
                value={safeAddress}
                onClick={async () => {
                  await safe.setSafeApiKit(safe.chainId);
                  await safe.setSafeSelected(safeAddress);
                }}
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

      {safe.safeSelected && (
        <SafeInfo safeAddress={safe.safeSelected} chainId={safe.chainId} />
      )}
    </ConnectedContainer>
  );
}

export default SafeAccount;
