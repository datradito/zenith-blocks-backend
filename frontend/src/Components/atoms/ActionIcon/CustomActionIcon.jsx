import React from 'react'
import EditIcon from '@mui/icons-material/Edit';

function CustomActionIcon({ onClick }) {

    const handleClick = () => {
        onClick?.();
    };

      return (
        <EditIcon style={{
          color: "#1A65C0",
          backgroundColor: "#242b33",
          borderRadius: "50%",
          padding: "0.25rem",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }} onClick={handleClick} />
      )
  
}

  export default CustomActionIcon;