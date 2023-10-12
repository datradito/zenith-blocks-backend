import React, { useState } from "react";
import styled from "styled-components";
import Label from "../Label/Label";
import CustomPDFViewIcon from "../PdfIcon/padfIcon";

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`;

const FileUploadInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

const PreviewContainer = styled.div`
  height: 200px; /* Fixed height for the preview */
  overflow-y: auto;
  border: 0.05rem solid #2c2c2c;
  padding: 10px;
`;

const PreviewImage = styled.img`
  width: 100%; /* Make the image fill the container */
  height: auto;
`;

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(URL.createObjectURL(selectedFile));
  };

  return (
    <FileUploadContainer>
      {file && (
        <PreviewContainer>
          <PreviewImage src={file} alt="File Preview" />
          {/* Display other types of files as needed */}
        </PreviewContainer>
      )}
      <Label>
        <FileUploadInput onChange={handleFileChange} />
        <div
          style={{
            padding: "0.5rem 2rem",
            backgroundColor: "#055FFC",
            borderRadius: "50px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          Upload
          <CustomPDFViewIcon />
        </div>
      </Label>
    </FileUploadContainer>
  );
};

export default FileUpload;
