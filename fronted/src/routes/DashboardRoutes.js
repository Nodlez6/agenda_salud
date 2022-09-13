import { Route, Routes } from "react-router-dom";
import { Home } from "../components/Home/Home";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};
