import React from 'react'
import useStyles from "./index.style"
import { Button } from '@mui/material';

const ButtonAtom = ({ config }) => {
    const classes = useStyles();
    return (
        <Button
            className={classes.buttonStyle}
            variant="contained"
            type={config.type ? config.type: "submit"}
            onClick={config.onClick}
        >
            {config.innerText}
        </Button>
    )
}

export default ButtonAtom
