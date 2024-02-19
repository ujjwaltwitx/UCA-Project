import React from "react";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardRoutes from "./Routes/DashboardRoutes";
import { AuthContext } from "./Utils/Context/AuthContext";
import AuthRoute from "./Routes/AuthRoute";
import Enroll from "./Pages/Form/Enroll";
import Loader from "./Components/Loader";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const { user, isLoading } = useContext(AuthContext);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div className="w-full h-full min-h-screen flex items-center justify-center">
          <Loader />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Routes>
            <Route path="/auth/*" element={<AuthRoute user={user} />} />
            <Route
              path="/dashboard/*"
              element={<DashboardRoutes user={user} />}
            />
            <Route path="/form" element={<Enroll user={user} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
