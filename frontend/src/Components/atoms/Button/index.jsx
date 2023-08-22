import React from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";

const ButtonAtom = ({ config }) => {

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


    const handleClick = (e) => {

        if (config.preventDefault) {
            console.log("preventDefault")
            e.preventDefault();
        }
        if (config.onClick) {
            config.onClick();
        }  
    };
    return (
        <>
            {
                config.label === 'Export CSVP' ? (
                    <CSVLink data={config.data} style={{ textDecoration: "none" }}>
                        <Button
                            sx={buttonComponentStyles.buttonStyle}
                            variant="contained"
                            type={config.type ? config.type : "submit"}
                            // onClick={config.onClick}
                        >
                            {config.innerText}
                        </Button>
                    </CSVLink>
                ) : <Button
                    sx={config.sx ? config.sx: buttonComponentStyles.buttonStyle}
                        variant="contained"
                        disabled={config.disabled ? config.disabled : false}
                        type={config.type ? config.type : "submit"}
                        onClick={handleClick}
                >
                    {config.innerText}
                </Button>
            }
        </>
    )
}

export default ButtonAtom
