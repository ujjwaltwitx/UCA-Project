import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Temp from "../Components/Temp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Student from "../Pages/Student/Student";
import Mail from "../Pages/Mail/Mail";
import Approval from "../Pages/Approval/Approval";
import Students from "../Pages/Students/Students";
import Reviews from "../Pages/Reviews/Reviews";
import Gallery from "../Pages/Gallery/Gallery";

export default function DashboardRoutes({ user }) {
  if (user === null) return <Navigate to="/auth/login" />;
  return (
    <Temp>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/student/:id" element={<Student />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/approvals" element={<Approval />} />
        <Route path="/students" element={<Students />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Temp>
  );
}
