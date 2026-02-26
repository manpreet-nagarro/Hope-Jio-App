import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { closeOverlay } from "../../../store/wireframeSlice/wireframeSlice";
import { OverlayContent } from "./WireframeOverlay.styles";

const WireframeOverlay = () => {
  const dispatch = useDispatch();

  const isOverlayOpen = useSelector(
    (state: RootState) => state.wireframe.isOverlayOpen
  );

  const selectedWireframeId = useSelector(
    (state: RootState) => state.wireframe.selectedWireframeId
  );

  return (
    <Drawer
      anchor="right"
      open={isOverlayOpen}
      onClose={() => dispatch(closeOverlay())}
    >
      <OverlayContent>
        <h3>Wireframe Details</h3>
        <p>ID: {selectedWireframeId}</p>
      </OverlayContent>
    </Drawer>
  );
};

export default WireframeOverlay;
