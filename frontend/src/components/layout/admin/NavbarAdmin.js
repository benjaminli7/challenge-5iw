import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSignOut } from "react-auth-kit";
import { Link, useLocation } from "react-router-dom";

const navbarItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin",
  },
  {
    label: "Users",
    icon: <GroupIcon />,
    path: "/admin/users",
  },
  {
    label: "Games",
    icon: <SportsEsportsIcon />,
    path: "/admin/games",
  },
  {
    label: "Teams",
    icon: <GroupsIcon />,
    path: "/admin/teams",
  },
];

export default function NavbarAdmin({ window, drawerWidth, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const signOut = useSignOut();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const activeItem = navbarItems.find(
    (item) => item.path === location.pathname
  );

  const drawer = (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Toolbar>
          <Typography>
            {/* <img src="./GameElevate.png" alt="logo" /> */}
            LOGO
          </Typography>
        </Toolbar>
        <List>
          {navbarItems.map((item, index) => (
            <Link to={item.path} key={index} sx={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => signOut()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        color="primary"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {activeItem.label}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navbar"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {children}
    </Box>
  );
}
