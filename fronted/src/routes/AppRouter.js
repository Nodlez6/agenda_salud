import { DashboardRoutes } from "./DashboardRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../components/Login/Login";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route path="/register" element={<Login />} />

          <Route
            path="/*"
            element={
              <PrivateRoutes>
                <DashboardRoutes />
              </PrivateRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
