import { Route, Routes } from "react-router-dom";
import { FilesSpecialistsScreen } from "../components/FilesSpec/FilesSpecialistsScreen";
import { Home } from "../components/Home/Home";
import { HomePacient } from "../components/HomePacient/HomePacient";
import { SpecialistScheduler } from "../components/HomePacient/SpecialistScheduler";
import { Navbar } from "../components/Navbar/Navbar";
import { PatientsScreen } from "../components/Patients/PatientsScreen";
import { ScheduleScreen } from "../components/Schedule/ScheduleScreen";
import { StatisticsScreen } from "../components/Statistics/StatisticsScreen";
import { RoleRoutes } from "./RoleRoutes";

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/homepacient" element={<HomePacient />} />
        <Route
          path="/homepacient/specialist/:id"
          element={<SpecialistScheduler />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/file/specialist" element={<FilesSpecialistsScreen />} />

        <Route
          path="/schedule"
          element={
            <RoleRoutes>
              <ScheduleScreen />
            </RoleRoutes>
          }
        />

        <Route
          path="/patients"
          element={
            <RoleRoutes>
              <PatientsScreen />
            </RoleRoutes>
          }
        />
        <Route
          path="/statistics"
          element={
            <RoleRoutes>
              <StatisticsScreen />
            </RoleRoutes>
          }
        />
      </Routes>
    </>
  );
};
