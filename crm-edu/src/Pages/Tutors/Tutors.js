import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AllTutors from "./AllTutors";
import AddTutor from "./AddTutor";

export default function Tutors() {
  return (
    <Routes>
      <Route path="/" element={<AllTutors />} />
      <Route path="/add" element={<AddTutor />} />
    </Routes>
  );
}
