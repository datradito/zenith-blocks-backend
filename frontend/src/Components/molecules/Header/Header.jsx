import React from 'react'
import { Box, Typography } from '@mui/material';

const headerContext = React.createContext()

function useHeaderContext() {
    const context = React.useContext(headerContext)
    if (!context) {
        throw new Error(`useHeaderContext must be used within a HeaderProvider`)
    }
    return context
}


function Header({ children }) {
    const [{ path, previousPath }, setPath] = React.useState({ path: "", previousPath: "" })
    
  return (
        <Box
      style={{
        width: "90%",
        margin: "1rem auto",
      }}
    >Header</Box>
  )
}

function PreviousPath({ children }) {
    const { previousPath } = useHeaderContext()
    return (
      <Typography variant="caption" style={{ color: "white" }}>
        {previousPath}
      </Typography>
    );
}

export default Header
