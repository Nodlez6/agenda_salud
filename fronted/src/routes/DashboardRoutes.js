import { Route, Routes } from "react-router-dom";
import { Inicio } from "../components/Login/Inicio/Inicio";

export const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </div>
  );
};
