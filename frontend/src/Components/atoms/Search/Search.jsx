import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import List from "../List/List";

const listStyles = {
  margin: "0",
  padding: "0",
  gap: "1rem",
  alignItems: "center",
  flexDirection: "row",
};

function Search({onSearch}) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleOnClick() {
    onSearch(searchTerm);
  }
  return (
    <List {...listStyles}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleOnClick}>Search </Button>
    </List>
  );
}

export default Search;
