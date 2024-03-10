import React, { useContext, useState } from "react";
import { FormControlLabel, Popover, Radio, RadioGroup } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { FormControl } from "@mui/base";
import { styled } from "@mui/system";
import Label from "../../atoms/Label/Label";
import { SwapContext } from "../../../utils/Providers/SwapProvider";

const StyledRefreshIcon = styled(SettingsIcon)({
  border: "none",
  padding: "0.3rem",
  borderRadius: "0.5rem",
  "&:hover": {
    backgroundColor: "#1F2639",
    cursor: "pointer",
  },
});

const SettingsPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { slippage, setSlippage } = useContext(SwapContext);

  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "slippage-popover" : undefined;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <StyledRefreshIcon aria-describedby={id} onClick={handleIconClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <FormControl
          component="fieldset"
          style={{
            backgroundColor: "#131823",
            border: "none",
            padding: "0.5rem",
            color: "white",
          }}
        >
          <Label>Slippage Tolerance</Label>
          <RadioGroup
            aria-label="slippage-tolerance"
            name="slippage-tolerance"
            value={slippage}
            onChange={handleSlippageChange}
            row
            style={{
              gap: "5px",
            }}
          >
            <FormControlLabel
              value="0.5"
              control={<Radio />}
              label="0.5%"
              style={{
                marginLeft: "4px",
              }}
            />
            <FormControlLabel value="2.5" control={<Radio />} label="2.5%" />
            <FormControlLabel value="5" control={<Radio />} label="5.0%" />
          </RadioGroup>
        </FormControl>
      </Popover>
    </div>
  );
};

export default SettingsPopover;
