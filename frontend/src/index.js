import Root from "@/Root";
import RootAdmin from "@/RootAdmin";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProtectedUserTypeRoute from "@/components/ProtectedUserTypeRoute";
import Page404 from "@/components/layout/404";
import AdminDashboardView from "@/pages/Admin/AdminDashboardView";
import AdminGamesView from "@/pages/Admin/AdminGames/AdminGamesView";
import AdminUsersView from "@/pages/Admin/AdminUsersView";
import Home from "@/pages/Home/Home";
import ProfileView from "@/pages/Profile/ProfileView";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ClientBoostersList from "@/pages/client/ClientBoostersList";
import ClientView from "@/pages/client/ClientView";
import theme from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";
import React from "react";
import { AuthProvider } from "react-auth-kit";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import ManagerView from "./pages/manager/ManagerView";
const queryClient = new QueryClient();

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
            path: "boosters",
            element: (
              <ProtectedUserTypeRoute type="client">
                <ClientBoostersList />
              </ProtectedUserTypeRoute>
            ),
          },
        ],
      },
      {
        path: "manager",
        children: [
          {
            path: "",
            element: (
              <ProtectedUserTypeRoute type="manager">
                <ManagerView />
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
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
