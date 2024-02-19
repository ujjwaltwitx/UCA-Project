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
import Tutors from "../Pages/Tutors/Tutors";
import { data } from "../Pages/Form/data";
import AddStudent from "../Pages/Students/AddStudent";
import Groups from "../Pages/Groups/Groups";

export default function DashboardRoutes({ user }) {
  return (
    <Temp>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/students" element={<Students />} />
        <Route path="/student/:id" element={<Student />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/tutor/*" element={<Tutors />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Temp>
  );
}
