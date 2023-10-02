import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

const ActionIconStyles = {
    padding: ".5rem",
    color: "#1A65C0",
    backgroundColor: "#242b33",
    borderRadius: "50%",
    "& .MuiSvgIcon-root": {
    color: "#1A65C0",
    fontSize: "0.75rem",
    },
};

function CustomActionIcon({ onClick }) {
    const [ openSpeedDial, setOpenSpeedDial ] = React.useState(false);

    const handleClick = () => {
         onClick ? onClick() : console.log("No onClick function passed to CustomActionIcon")
    };

    return (
        <Stack direction="row" spacing={1}>
            <EditIcon sx={ActionIconStyles} onClick={handleClick} />
        </Stack>
    );
}

export default CustomActionIcon