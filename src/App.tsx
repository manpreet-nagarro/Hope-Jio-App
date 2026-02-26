import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "@components/login/LoginPage";
import ForbiddenPage from "@pages/ForbiddenPage/ForbiddenPage";
import UnauthorizedPage from "@pages/UnauthorizedPage/UnauthorizedPage";
import ProtectedRoute from "@routes/ProtectedRoutes";

import HomePage from "@components/homepage/homepage";
import WireframeEditor from "@components/wireframeEditor/editorCanvas/wireframeEditor";
import WireframesPage from "@pages/Wireframe/WireframePage";
import WireframeLayout from "@pages/Wireframe/WireframeLayout";
import EditorLayout from "@pages/WireframeEditor/editorLayout";
import "./App.css"
import URLManagerPage from "@pages/URLManager/URLManagerPage";

// const rawBasePath = process.env.BASE_PATH || '/';
// const basename = rawBasePath === '/' ? '/' : rawBasePath.replace(/\/+$/, '');

const App = () => {
  return (
    <BrowserRouter basename="/hope">
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<HomePage />}>
            <Route path="/wireframe" element={<WireframeLayout />}>
              <Route index element={<WireframesPage/>}/>
            </Route>
            <Route path="/urlmanager" element={<URLManagerPage />} />
          </Route>
          <Route element={<EditorLayout />}>
            <Route path="wireframe/editor/:wireframeId" element={<WireframeEditor />}/>
          </Route>
        </Route>

        {/* Error pages */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/wireframe" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
