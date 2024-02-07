import React from "react";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardRoutes from "./Routes/DashboardRoutes";
import { AuthContext } from "./Utils/Context/AuthContext";
import AuthRoute from "./Routes/AuthRoute";
import Enroll from "./Pages/Form/Enroll";
import { useState } from "react";
import Loader from "./Components/Loader";
import { useEffect } from "react";

export default function App() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  function fetchingData() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    fetchingData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoute user={user} />} />
      <Route path="/dashboard/*" element={<DashboardRoutes user={user} />} />
      <Route path="/form" element={<Enroll user={user} />} />
      {user ? (
        <Route path="*" element={<Navigate to="/dashboard" />} />
      ) : (
        <Route path="*" element={<Navigate to="/auth/login" />} />
      )}
    </Routes>
  );
}
