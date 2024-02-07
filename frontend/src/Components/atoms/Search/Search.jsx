import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputWithIcon from "../../molecules/Input/InputWithIcon";
import { Stack } from "@mui/system";
import { InputBase } from "@mui/material";

function Search({ onSearch }) {
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
        placeholder="Search Proposals By Title"
        inputProps={{ "aria-label": "search Proposals By Title" }}
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
