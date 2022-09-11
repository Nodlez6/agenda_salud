import { Route, Routes } from "react-router-dom";
import { Home } from "../components/Home/Home";

export const DashboardRoutes = () => {
  return (
    <div>
      <h1>sfdasfd</h1>
      <Routes>
        <Route path="/inicio" element={<Home />} />
      </Routes>
    </div>
  );
};
