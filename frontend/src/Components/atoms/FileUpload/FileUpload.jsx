import React from 'react'
import { TextField } from '@mui/material';

function FileUpload({handleChange, key}) {
  return (
    <TextField
      type="file"
      variant="outlined"
      onChange={(e) => handleChange("Upload Invoice", e.target.files[0])}
    />
  );
}

export default FileUpload