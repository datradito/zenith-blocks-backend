import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputWithIcon from "../../molecules/Input/InputWithIcon";
import { Stack } from "@mui/system";
import { InputBase } from "@mui/material";

function Search({ onSearch, ...props }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleOnClick() {
    onSearch(searchTerm);
  }
  return (
    <Stack
      direction="row"
      sx={{
        gap: "1rem",
      }}
    >
      <InputBase
        placeholder={props.placeholder || "Search"}
        inputProps={{ "aria-label": "search"}}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          border: "none",
          backgroundColor: "transparent",
        }}
      />
      <IconButton
        type="button"
        onClick={handleOnClick}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Stack>
  );
}

export default Search;
