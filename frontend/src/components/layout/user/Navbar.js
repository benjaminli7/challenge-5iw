import useNavbar from "@/components/layout/user/hooks/useNavbar";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";

const drawerWidth = 240;

export default function Navbar({ window }) {
  const {
    handleDrawerToggle,
    mobileOpen,
    signOut,
    getNavItems,
    isAuthenticated,
    authNavItems,
  } = useNavbar();

  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <>
      <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
        <>
          <Typography variant="h6" sx={{ my: 2 }}>
            Logo
          </Typography>
          <Divider />
          <List>
            {getNavItems().map((item, index) => (
              <Link key={index} to={item.path}>
                <ListItem key={index} disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            {isAuthenticated() &&
              authNavItems.map((item, index) => (
                <Link key={index} to={item.path}>
                  <ListItem key={index} disablePadding>
                    <ListItemButton sx={{ textAlign: "center" }}>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
          </List>
        </>
      </Box>
      <Box sx={{ m: 3 }}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          {isAuthenticated() ? (
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                queryClient.removeQueries();
                signOut();
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="contained"
                  color="purple"
                  fullWidth
                  sx={{ ml: 1, color: "#fff" }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ ml: 1 }}
                >
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Box>
    </>
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
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            {getNavItems().map((item, index) => (
              <Link key={index} to={item.path}>
                <Button
                  variant="text"
                  startIcon={item.icon}
                  key={index}
                  sx={{ color: "#fff" }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            {isAuthenticated() ? (
              <>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>?</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {authNavItems.map((item, index) => (
                    <MenuItem key={index} onClick={handleClose}>
                      <Link
                        to={item.path}
                        className="flex items-center justify-center"
                      >
                        {item.icon} {item.label}
                      </Link>
                    </MenuItem>
                  ))}
                  <Divider />
                  <MenuItem onClick={() => {
                    queryClient.removeQueries();
                    signOut()
                  }}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
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
              justifyContent: "space-between",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
