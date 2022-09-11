import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const auth = false;
  return auth ? children : <Navigate to="/login" />;
};
