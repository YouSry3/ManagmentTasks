// Routes/index.tsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import Settings from "@/Pages/Settings";
import ProtectedRoute from "../Components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout خاص بالموقع كله */}
      <Route element={<MainLayout />}>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
            
          }
        />
      </Route>

      {/* Layout خاص بـ Login و Register */}
      <Route element={<AuthLayout />}>
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
