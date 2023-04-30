import React from 'react'
import useStyles from "./index.style"
import { Button } from '@mui/material';
// import config from "./index.config"

const ButtonAtom = ({ config }) => {



    //leave the config in this file, but pass function references as props. once in this file file the object config and add onClick or all all fucntion to that object
    // let config = {
    //     buttonConfig: {
    //         label: "Create budget",
    //         variant: "contained",
    //         type: "submit",
    //         onClick: "handleBudgetCreateOnClick",
    //         innerText: "Create Budget"
    //     },
    //     button2Config: {
    //         label: "Create budget",
    //         variant: "contained",
    //         type: "submit",
    //         onClick: "handleBudgetCreateOnClick",
    //         innerText: "Create Budget"
    //     }
    // };

    // config = Object.keys(config).map((key) => {
    //     if (key == configName) {
    //         return(config[key])
    //     }
    // })

    // console.log(config[0])
    

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
