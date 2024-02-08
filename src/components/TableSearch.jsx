import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

const TableSearch = ({ searchValue, handleSearch }) => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // maxWidth: 400,
        // // margin: "auto",
        // width: "100%",
        padding: "16px 5px",
        // gap: "40%",
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        sx={{}}
        // style={{ width: "calc(50% - 8px)" }}
        value={searchValue}
        onChange={handleSearch}
        InputProps={{
          background: "black",
        }}
      />
    </Box>
  );
};

export default TableSearch;
