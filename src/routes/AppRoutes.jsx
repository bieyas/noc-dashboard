// src/routes/AppRoutes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Map from "../pages/Map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/map", element: <Map /> },
    ]
  }
]);

export default router;
