import { Navigate } from "react-router-dom";

export const PublicRoutes = ({ children }) => {
  const auth = false;

  return auth ? <Navigate to="/home" /> : children;
};
