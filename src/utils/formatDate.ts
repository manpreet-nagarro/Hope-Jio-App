export const formatLastUpdated = (dateStr?: string) => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
