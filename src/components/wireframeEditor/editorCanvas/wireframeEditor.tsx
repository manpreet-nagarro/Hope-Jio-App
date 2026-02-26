import { SlotCanvas } from "@components/slotEditorCanvas/mainSlotCanvas/mainSlotCanvas";
import { useParams } from "react-router-dom";
import { fetchWireframeById } from "@api/wireframe.api";
import { setSelectedWireframe } from "@store/wireframeSlice/wireframeSlice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createEmptySlot,
  updateSlotComponentsWithDimensions,
} from "@components/slotEditorCanvas/utils/slotUtils";
import { setSlots } from "@store/slotsSlice/slotsSlice";
import Loader from "@components/loader/Loader";
import type { RootState } from "@store/store";

const WireframeEditor = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const wireframeId = params.wireframeId;
  const slots = useSelector((state: RootState) => state.slots.slots);
  const selectedWireframe = useSelector(
    (state: RootState) => state.wireframe.selectedWireframe,
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["wireframe-by-id", wireframeId],
    queryFn: () =>
      wireframeId ? fetchWireframeById(wireframeId) : Promise.resolve(null),
    enabled: !!wireframeId,
  });

  useEffect(() => {
    if (data) {
      dispatch(setSelectedWireframe(data));
      const updatedSlots = updateSlotComponentsWithDimensions(data.slots || []);
      dispatch(
        setSlots(updatedSlots.length ? updatedSlots : [createEmptySlot()]),
      );
    }
  }, [data, dispatch]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (selectedWireframe && slots?.length && selectedWireframe?.slots) {
        const slotsString = JSON.stringify(slots);
        const wireframeSlotsString = JSON.stringify(selectedWireframe.slots);
        if (slotsString !== wireframeSlotsString) {
          // e.preventDefault();
          // e.returnValue =
          //   "Your changes will be saved and the editor will close.";
          // return e.returnValue;
        }
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [slots, selectedWireframe]);

  if (isLoading) return <Loader open={true} />;
  if (error) return <div>Error loading wireframe</div>;

  return (
    <div>
      <SlotCanvas />
    </div>
  );
};

export default WireframeEditor;
