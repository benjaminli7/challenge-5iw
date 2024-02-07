import { useState } from "react";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";

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
    },
  ];
  const authNavItems = [
    {
      label: "Profile",
      path: "/profile",
    },
  ];
  const managerNavItems = [
    {
      label: "My team",
      path: "/my-team",
    },
  ];
  const getNavItems = () => {
    let navItems = globalNavItems;
    if (isAuthenticated()) {
      if (user.type === "manager") {
        navItems = navItems.concat(managerNavItems);
      }
      if (user.type === "client") {
        navItems = navItems.concat(authNavItems);
      }
      navItems = navItems.concat(authNavItems);
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
  };
}
