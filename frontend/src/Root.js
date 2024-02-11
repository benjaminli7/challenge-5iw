import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/user/Navbar";
import Footer from "@/components/layout/user/Footer";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Toaster } from "sonner";

function Root() {
  return (
    <>
      <CssBaseline />
      <Toaster position="top-center" richColors />
      <Navbar/>
      <Box className="container" component="main" sx={{ p: 3}}>
        <Toolbar />
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default Root;
