import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

export const PublicRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user.admin) {
    return user.logged ? <Navigate to="/home" /> : children;
  } else {
    return user.logged ? <Navigate to="/homepacient" /> : children;
  }
};
