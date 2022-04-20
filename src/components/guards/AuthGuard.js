import * as React from "react";
import { Navigate } from "react-router-dom";

//import useAuth from "../../hooks/useAuth";

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  // const { isAuthenticated } = useAuth();

  if (!localStorage.getItem("currentUser")) {
    return <Navigate to="/" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
