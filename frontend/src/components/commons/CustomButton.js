import React from 'react'
import { Button, Box, CircularProgress } from "@mui/material";
function CustomButton({
    isSubmitting,
    children,
    ...props
}) {
  return (
    <Box sx={{ m: 1, position: "relative" }}>
      <Button disabled={isSubmitting} {...props}>
        {children}
      </Button>
      {isSubmitting && (
        <CircularProgress
          size={24}
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === "light" ? 200 : 700],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
}

export default CustomButton