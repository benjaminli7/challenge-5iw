import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Navbar({ window }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();
  const globalNavItems = [
    {
      label: "Home",
      path: "/",
    },
  ];
  const authNavItems = [
    {
      label: "Profile",
      path: "/profile",
    },
  ];
  const navItems = isAuthenticated()
    ? globalNavItems.concat(authNavItems)
    : globalNavItems;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Logo
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <ListItem key={index} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <AppBar component="nav" sx={{ backgroundColor: "rgb( 32,32,43 )" }}>
        <Toolbar className="container">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {/* <img src="./GameElevate.png" alt="logo" /> */}
            Logo
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <Button key={index} sx={{ color: "#fff" }}>
                  {item.label}
                </Button>
              </Link>
            ))}
            {isAuthenticated() ? (
              <Button
                onClick={() => signOut()}
                variant="contained"
                color="error"
                sx={{ ml: 1 }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="contained" color="purple" sx={{ ml: 1 }}>
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="contained" color="primary" sx={{ ml: 1 }}>
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
