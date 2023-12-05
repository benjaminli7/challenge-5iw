import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/user/Navbar";
import Footer from "./components/layout/user/Footer";
import { Box, CssBaseline, Toolbar } from "@mui/material";
// import { useAuthUser } from "react-auth-kit";
// import { Navigate } from "react-router-dom";

function Root() {
  // const auth = useAuthUser();
  // console.log(auth())
  // if(auth().user.isFirstConnection === true) {
  //   return <Navigate to="/profile" replace />;
  // }
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box className="container" component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default Root;
