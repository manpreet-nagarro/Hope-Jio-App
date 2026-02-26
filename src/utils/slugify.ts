export const slugify = (value: string): string => {
  if (!value) return "";

  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  return `/${slug}`;
};
