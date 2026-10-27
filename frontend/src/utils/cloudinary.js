// Every stored image URL already carries f_auto,q_auto (auto format + auto
// quality) from the migration script. This just layers a display-width hint
// on top at the point of use, since the same image can appear at very
// different sizes (a grid thumbnail vs. a full product detail view).
export function cld(url, width) {
  if (!url || typeof url !== "string" || !width) return url;
  if (!url.includes("/upload/f_auto,q_auto/")) return url;
  return url.replace("/upload/f_auto,q_auto/", `/upload/f_auto,q_auto,w_${width}/`);
}
