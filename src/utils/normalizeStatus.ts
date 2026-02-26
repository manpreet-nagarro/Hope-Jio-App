import type { WireframeStatus } from "./statusColor";

export const normalizeStatus = (
  status?: string
): WireframeStatus => {
  switch (status?.toLowerCase()) {
    case "draft":
    case "pg. draft":
      return "Pg. Draft";
    case "approved":
    case "pg. approved":
      return "Pg. Approved";
    case "in_review":
    case "in review":
    case "in-review":
    case "pg. in_review":
    case "pg. in review":
    case "pg. in-review":
      return "Pg. In Review";
    case "archived":
    case "pg. archived":
      return "Pg. Archived";
    case "published":
    case "pg. published":
      return "Pg. Published";
    case "Sent to CMS":
    case "pg. sent to cms":
    case "SENT_TO_CMS":
    case "sent_to_cms":
      return "Sent to CMS";
    case "rejected":
    case "pg. rejected":
      return "Pg. Rejected";
    default:
      return "Pg. Draft"; // safe fallback
  }
};
