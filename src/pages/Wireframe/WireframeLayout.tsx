import { Outlet, useMatch } from "react-router-dom";
import EditorLayout from "../WireframeEditor/editorLayout";

const WireframeLayout = () => {
  const isEditorRoute = useMatch("/wireframe/editor/:wireframeId");

  if (isEditorRoute) {
    return <EditorLayout />;
  }

  return <Outlet />;
};

export default WireframeLayout;
