import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

export const RoleRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user.admin ? children : <Navigate to="/home" />;
};
