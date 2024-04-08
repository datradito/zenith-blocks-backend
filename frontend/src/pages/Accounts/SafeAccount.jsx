import React from "react";
import SafeInfo from "../../Components/features/safe/SafeInfo.jsx";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AddressLabel from "../../Components/features/safe/AddressLabel.jsx";
import styled from "styled-components";
import useSafeStore from "../../store/modules/safe/index.ts";
import { InputLabel, Box } from "@mui/material";
import Button from "../../Components/atoms/Button/Button";
import { message } from "antd";
import Label from "../../Components/atoms/Label/Label";
import useGetContacts from "../../Components/hooks/Contacts/useGetContacts";

export const ConnectedContainer = styled(Box)(
  ({ theme }) => `
  border-radius: 10px;
  padding: 40px 32px;  
`
);

function SafeAccount(props) {
  const safe = useSafeStore();
  const { loadContacts } = useGetContacts();

  const handleLoadSafes = async () => {
    await safe.setSafeApiKit(safe.chainId);
    await safe?.getSafesOwned();
  };

  const handleSafeSelection = async (safeAddress) => {
    await safe.setSafeApiKit(safe.chainId);
    await safe.setSafeSelected(safeAddress);
    loadContacts();
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

      {!safe.safeSelected && safe.safes.length > 0 && (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="switch-address-selector-label">
            Select Safe
          </InputLabel>

          <Select
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
                  handleSafeSelection(safeAddress);
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
