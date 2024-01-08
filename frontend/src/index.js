import { ThemeProvider } from "@emotion/react";
import React from "react";
import { AuthProvider } from "react-auth-kit";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page404 from "./components/layout/404";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import AdminDashboardView from "./pages/Admin/AdminDashboardView";
import AdminUsersView from "./pages/Admin/AdminUsersView";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home/Home";
import ProfileView from "./pages/Profile/ProfileView";
import Root from "./Root";
import RootAdmin from "./RootAdmin";
import theme from "./theme/theme";
import AdminGamesView from "./pages/Admin/AdminGames/AdminGamesView";
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
      }
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
