import React, { useEffect } from 'react'
import { Button } from '@mui/material';
import { CSVLink } from "react-csv";
import { sanitizeCsvData } from '../../../Services/exportCsvService';

const ButtonAtom = ({ config }) => {
  const [data, setData] = React.useState();

    const buttonComponentStyles = {
        buttonStyle: {
            backgroundColor: config.backgroundColor ? config.backgroundColor : "#055FFC",
            margin: config.margin? config.margin: "1rem 0",
            borderRadius: "50px",
            fontSize: ".85rem",
            textTransform: "none",
            maxWidth: "10rem",
            width: config.width ? config.width : "10rem",
            mr: config.mr ? config.mr : "0",
            ml: config.ml ? config.ml : "0",
            "&:hover": {
                backgroundColor: config.hoverBackgroundColor ? config.hoverBackgroundColor : "#055FFC",
            },
            "&:disabled": {
                backgroundColor: config.disabledBackgroundColor ? config.disabledBackgroundColor : "#9bb8ff",
            },
        }

    }

  useEffect(() => {
    const csvdata = config.label === "Export CSV" ? sanitizeCsvData(config.data, config.filetype) : null;
    setData(csvdata);
  }, []);

  const handleClick = (e) => {
        if (config.preventDefault) {
            e.preventDefault();
        }
    if (config.onClick) {
            config.onClick();
        }  
  };
  
    return (
      <>
        {config.label === "Export CSV" && data ? (
          <CSVLink
            data={data}
            style={{ textDecoration: "none" }}
            filename={`${config.filetype}.${new Date().toLocaleString()}.csv`}
          >
            <Button
              sx={buttonComponentStyles.buttonStyle}
              variant="contained"
              type={config.type ? config.type : "submit"}
            >
              {config.innerText}
            </Button>
          </CSVLink>
        ) : (
          <Button
            sx={config.sx ? config.sx : buttonComponentStyles.buttonStyle}
            variant="contained"
            disabled={config.disabled ? config.disabled : false}
            type={config.type ? config.type : "submit"}
            onClick={handleClick}
          >
            {config.innerText}
          </Button>
        )}
      </>
    );
}

export default ButtonAtom
