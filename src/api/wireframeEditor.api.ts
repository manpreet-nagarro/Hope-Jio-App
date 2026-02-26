import { apiFetch } from "@api/ApiFetcher";
import { WIREFRAMES_API_BASE_URL } from "@api/api-paths";
import { FE_CRYPTO_ID_PREFIX } from "@constants/commonConstants";
import type { IWireframe } from "src/interfaces/Wireframes";
import type { ISaveWireframeCanvasPayload, ISaveWireframeComponent, ISaveWireframeSlot } from "src/interfaces/wireframeEditor";

/* helper: detect FE temporary ids */
const isTempId = (id: unknown): boolean =>
  typeof id === "string" && id.startsWith(FE_CRYPTO_ID_PREFIX);

/* helper: build save payload */
export const buildSavePayload = (
  selectedWireframe: IWireframe,
  slots: ISaveWireframeSlot[],
): ISaveWireframeCanvasPayload => ({
  wireframeId: selectedWireframe.wireframeId,
  name: selectedWireframe.wireframeName,
  description: selectedWireframe.description,
  slots: slots.map((slot) => ({
    id: isTempId(slot.id) ? null : slot.id,
    name: slot.name,
    state: "ACTIVE",
    components: slot.components.map((component: ISaveWireframeComponent) => ({
      id: isTempId(component.id) ? null : component.id,
      type: component.type,
      width: component.data?.width,
      height: component.data?.height,
      banners: [],
      name: component?.name || "",
    })),
  })),
});


/* API call */
export const saveWireframeCanvas = (
  payload: ISaveWireframeCanvasPayload,
) => {
  return apiFetch(
    `${WIREFRAMES_API_BASE_URL}/api/wireframes/${payload.wireframeId}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
  )
};
