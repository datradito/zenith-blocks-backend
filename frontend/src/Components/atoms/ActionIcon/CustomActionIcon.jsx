import React from 'react'
import EditIcon from '@mui/icons-material/Edit';


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

    const handleClick = () => {
        onClick?.();
    };

      return (
        <EditIcon sx={ActionIconStyles} onClick={handleClick} />
      )
  
}

  export default CustomActionIcon;