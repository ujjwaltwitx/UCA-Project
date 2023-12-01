import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../Utils/Context/AuthContext";

const PrivateRoute = ({ element, path, children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : null;
};

export default PrivateRoute;
