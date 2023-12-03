import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "./components/layout/admin/NavbarAdmin";
import { isAdmin } from "./services/api";
import Page404 from "./components/layout/404";

const drawerWidth = 240;

function RootAdmin() {
  if (!isAdmin()) {
    return <Page404 />;
  }
  return (
    <>
      <CssBaseline />
      <NavbarAdmin drawerWidth={drawerWidth}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </NavbarAdmin>
    </>
  );
}

export default RootAdmin;
