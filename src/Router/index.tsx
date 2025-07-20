// Routes/index.tsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import ProtectedRoute from "../Components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout خاص بالموقع كله */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
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
