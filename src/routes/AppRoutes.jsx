// src/routes/AppRoutes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Map from "../pages/MapPage";
import MikrotikPage from "../pages/MikrotikPage";
import PppoeUsers from "../pages/PppoeUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/mikrotik", element: <MikrotikPage /> },
      { path: "/pppoe", element: <PppoeUsers /> },
      { path: "/map", element: <Map /> },
    ]
  }
]);

export default router;
