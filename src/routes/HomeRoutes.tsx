import { Routes, Route } from "react-router-dom";
import Wireframe from "../pages/Wireframe/WireframePage";
import URLManagerPage from "@pages/URLManager/URLManagerPage";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Wireframe />} />
      <Route path="/urlmanager" element={<URLManagerPage />} />
    </Routes>
  );
};

export default HomeRoutes;
