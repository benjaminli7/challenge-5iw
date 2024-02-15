import Root from "@/Root";
import RootAdmin from "@/RootAdmin";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProtectedUserTypeRoute from "@/components/ProtectedUserTypeRoute";
import Page404 from "@/components/layout/404";
import AdminDashboardView from "@/pages/admin/AdminDashboardView";
import AdminGamesView from "@/pages/admin/games/AdminGamesView";
import AdminTeamsView from "@/pages/admin/teams/AdminTeamsView";
import AdminUsersView from "@/pages/admin/users/AdminUsersView";
import ChangePassword from "@/pages/auth/ChangePassword";
import Validation from "@/pages/auth/Validation";
import EmailForgetPassword from "@/pages/auth/EmailForgetPassword";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ClientBoosterDetail from "@/pages/client/ClientBoosterDetail";
import ClientBoostersView from "@/pages/client/ClientBoostersView";
import ClientView from "@/pages/client/ClientView";
import Home from "@/pages/home/Home";
import ManagerCreateTeamForm from "@/pages/manager/ManagerCreateTeamForm";
import ManagerView from "@/pages/manager/ManagerView";
import PlayerView from "@/pages/player/PlayerView";
import ProfileView from "@/pages/profile/ProfileView";
import theme from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import React from "react";
import { AuthProvider } from "react-auth-kit";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Page404 />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <EmailForgetPassword />,
      },
      {
        path: "changePassword",
        element: <ChangePassword />,
      },
      {
        path: "validation",
        element: <Validation />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfileView />
          </ProtectedRoute>
        ),
      },
      {
        path: "client",
        children: [
          {
            path: "",
            element: (
              <ProtectedUserTypeRoute type="client">
                <ClientView />
              </ProtectedUserTypeRoute>
            ),
          },
          {
            path: "players",
            element: (
              <ProtectedUserTypeRoute type="client">
                <ClientBoostersView />
              </ProtectedUserTypeRoute>
            ),
          },
          {
            path: "players/:id",
            element: (
              <ProtectedUserTypeRoute type="client">
                <ClientBoosterDetail />
              </ProtectedUserTypeRoute>
            ),
          },
        ],
      },
      {
        path: "my-team",
        children: [
          {
            path: "",
            element: (
              <ProtectedUserTypeRoute type="manager">
                <ManagerView />
              </ProtectedUserTypeRoute>
            ),
          },
          {
            path: "create",
            element: (
              <ProtectedUserTypeRoute type="manager">
                <ManagerCreateTeamForm />
              </ProtectedUserTypeRoute>
            ),
          },
        ],
      },
      {
        path: "player-dashboard",
        children: [
          {
            path: "",
            element: (
              <ProtectedUserTypeRoute type="player">
                <PlayerView />
              </ProtectedUserTypeRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <RootAdmin />
      </ProtectedRoute>
    ),
    errorElement: <Page404 />,
    children: [
      {
        path: "",
        element: <AdminDashboardView />,
      },
      {
        path: "users",
        element: <AdminUsersView />,
      },
      {
        path: "games",
        element: <AdminGamesView />,
      },
      {
        path: "teams",
        element: <AdminTeamsView />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ height: "100vh", position: "relative" }}>
              <RouterProvider router={router} />
            </Box>
          </LocalizationProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
