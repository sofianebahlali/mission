// ProtectedRoute.js

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ element }) {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? element : <Navigate to="/" />;
}

export default ProtectedRoute;
