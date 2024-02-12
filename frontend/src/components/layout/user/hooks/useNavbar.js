import { useState } from "react";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Avatar } from "@mui/material";

export default function useNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const auth = useAuthUser();
  const user = auth()?.user;

  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();

  const globalNavItems = [
    {
      label: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
  ];
  const authNavItems = [
    {
      label: "Profile",
      path: "/profile",
      icon: <Avatar />,
    },
  ];
  const managerNavItems = [
    {
      label: "My team",
      path: "/my-team",
      icon: <GroupIcon />,
    },
  ];
  const clientNavItems = [
    {
      label: "Liste de joueurs",
      path: "/players",
      icon: <FormatListBulletedIcon />,
    }
  ]
  const playerNavItems = [
    {
      label: "Espace joueur",
      path: "/player-dashboard",
      icon: <AccountCircleIcon />,
    }
  ]
  const getNavItems = () => {
    let navItems = globalNavItems;
    if (isAuthenticated()) {
      if (user.type === "manager") {
        navItems = navItems.concat(managerNavItems);
      }
      if (user.type === "client") {
        navItems = navItems.concat(clientNavItems);
      }
      if (user.type === "player") {
        navItems = navItems.concat(playerNavItems);
      }
    }
    return navItems;
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return {
    handleDrawerToggle,
    mobileOpen,
    signOut,
    getNavItems,
    isAuthenticated,
    authNavItems,
  };
}
