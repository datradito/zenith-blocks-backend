import React from 'react'
import { Button } from '@mui/material';

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
    return (
        <Button
            sx = {buttonComponentStyles.buttonStyle}
            variant="contained"
            type={config.type ? config.type: "submit"}
            onClick={config.onClick}
        >
            {config.innerText}
        </Button>
    )
}

export default ButtonAtom
