import { lazy } from "react";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ResidentPage = lazy(() => import("./pages/ResidentPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));


export const routes = [
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/home", element: <HomePage /> },
  { path: "/resident", element: <ResidentPage /> },
  { path: "/admin", element: <AdminPage /> },
];
