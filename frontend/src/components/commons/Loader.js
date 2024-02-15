import React from 'react'
import { Box, CircularProgress } from '@mui/material'

function Loader() {
  return (
    <Box sx={{ height: "80vh", display: "flex", justifyContent:"center", alignItems: "center"}}>
        <CircularProgress />
    </Box>
  )
}

export default Loader