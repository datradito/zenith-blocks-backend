import React from "react";
import { useDispatch } from "react-redux";
import { updateHeader } from "../../../actions/createInvoiceAction";
import { Box, Grid, TextField, Typography } from "@mui/material";
import CurrencyDropdown from "../../atoms/CurrencyDropdown/CurrencyDropdown";
import UnstyledSelectBasic from "../../atoms/SelectDropdown/SelectDropdown";
import FileUpload from "../../atoms/FileUpload/FileUpload";
import { FormControl } from "@mui/material";
import CustomizedSnackbars from "../../atoms/SnackBar/SnackBar";
import { categories } from "../../pages/Category/Category";

const componentStyles = {
  formInputFieldStyles: {
    color: "white",
    padding: "0",
    border: ".08rem #2c2c2c solid",
    borderRadius: "5px",
    backgroundColor: "#24292E",

    "& .MuiInputBase-input": {
      padding: "0.5rem",
      color: "white",
      borderRadius: "5px",
      fontSize: ".85rem",
      fontWeight: "small",
    },

    "& .MuiInputBase-root": {
      padding: "0",
    },
    "& .MuiSvgIcon-root": {
      color: "white",
    },
  },
  typographyLabel: {
    color: "gray",
    fontSize: ".70rem",
  },
  boxStyles: {
    display: "flex",
    flexDirection: "column",
    margin: "0rem auto",
    textAlign: "left",
    borderBottom: ".05rem #2C2C2C solid",
  },
  containerStyles: {
    padding: "2rem ",
  },
};

function CreateInvoiceForm({ invoice, errors }) {
  const dispatch = useDispatch();

  console.log("invoice", invoice);

  const handleChange = (key, value) => {
    dispatch(updateHeader(key, value));
  };

  return (
    <>
      <Box sx={componentStyles.boxStyles}>
        <Grid container sx={componentStyles.containerStyles} spacing={3}>
          {Object.entries(invoice).map(([key, value], index) => (
            <Grid
              item
              xs={
                index < 2
                  ? 6
                  : index === 2
                  ? 7
                  : index === 3
                  ? 3
                  : index === 4
                  ? 2
                  : index > 4 && index < 7
                  ? 4
                  : index === 7
                  ? 4
                  : 6
              }
              key={index}
            >
              <Typography variant="h6" sx={componentStyles.typographyLabel}>
                {key}
              </Typography>
              {key === "Currency" ? (
                <CurrencyDropdown
                  value={invoice[key]}
                  sx={componentStyles.formInputFieldStyles}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ) : key === "Due Date" || key === "Invoice Date" ? (
                <FormControl required fullWidth>
                  <TextField
                    required
                    type="date"
                    fullWidth
                    value={invoice[key]}
                    sx={componentStyles.formInputFieldStyles}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                </FormControl>
              ) : key === "Category" ? (
                <UnstyledSelectBasic
                  defaultValue={invoice.Category}
                  values={categories}
                  onChange={(value) => handleChange(key, value)}
                />
              ) : key === "Upload Invoice" ? (
                <FileUpload handleChange={handleChange} key={key} />
              ) : key === "Invoice Number" ? (
                <TextField
                  required
                  fullWidth
                  value={invoice[key]}
                  sx={componentStyles.formInputFieldStyles}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ) : key === "Total" ? (
                <TextField
                  required
                  type="number"
                  fullWidth
                  value={invoice[key]}
                  sx={componentStyles.formInputFieldStyles}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ) : (
                <TextField
                  name={key}
                  required
                  value={invoice[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  fullWidth
                  multiline={key === "Description" || key === "Upload Invoice"}
                  rows={
                    key === "Description" || key === "Upload Invoice" ? 4 : 1
                  }
                  InputProps={{
                    readOnly:
                      key === "Proposal" ||
                      key === "Goverance" ||
                      key === "Ipfs Link" ||
                      key === "Total Budget",
                  }}
                  sx={componentStyles.formInputFieldStyles}
                />
              )}
            </Grid>
          ))}
          {errors && (
            <CustomizedSnackbars
              message={errors}
              severity="error"
              autoOpen={true}
            />
          )}
        </Grid>
      </Box>
    </>
  );
}

export default CreateInvoiceForm;
