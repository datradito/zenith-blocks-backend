import React from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";

const ButtonAtom = ({ config }) => {

    const buttonComponentStyles = {
        buttonStyle: {
            backgroundColor: config.backgroundColor ? config.backgroundColor : "#055FFC",
            margin: "1rem 0",
            borderRadius: "50px",
            fontSize: ".85rem",
            textTransform: "none",
            maxWidth: "10rem",
            mr: config.mr ? config.mr : "0",
            ml: config.ml ? config.ml : "0",
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
                    sx={buttonComponentStyles.buttonStyle}
                    variant="contained"
                    type={config.type ? config.type : "submit"}
                        onClick={handleClick}
                        // onSubmit={config.onSubmit}
                >
                    {config.innerText}
                </Button>
            }
        </>
    )
}

export default ButtonAtom
