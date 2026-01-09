export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/%20/g, " ")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

export const unslugify = (text: string) => {
  return text
    .replace(/-/g, " ")
};
