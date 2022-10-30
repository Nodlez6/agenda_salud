import { DashboardRoutes } from "./DashboardRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginScreen } from "../components/Login/LoginScreen";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { RegisterScreen } from "../components/Register/RegisterScreen";
import { EmailMessage } from "../components/updatePassword/EmailMessage";
import { EmailMessageScreen } from "../components/updatePassword/EmailMessageScreen";
const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <LoginScreen />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <RegisterScreen />
              </PublicRoutes>
            }
          />

<Route
            path="/emailMessage"
            element={
              <PublicRoutes>
                <EmailMessageScreen />
              </PublicRoutes>
            }
          />

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
