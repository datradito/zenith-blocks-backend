import React from 'react'
import Tooltip from "@mui/material/Tooltip";

function ToolTip({children, info = ""}) {
  return (
    <Tooltip title={info} placement="top">
      {children}
    </Tooltip>
  )
}

export default ToolTip