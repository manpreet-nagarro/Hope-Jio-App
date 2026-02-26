import PlansIcon from "@assets/icons-svg/plansIcon";
import AttachmentIcon from "@assets/icons-svg/attachmentIcon";

export const ROUTE_ICON_MAP = {
  Wireframe: {
    path: "/wireframe",
    Icon: PlansIcon,
    label: "Wireframe Pages",
  },
  "Url Manager": {
    path: "/urlmanager",
    Icon: AttachmentIcon,
    label: "URL Manager",
  },
} as const;
