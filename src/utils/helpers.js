export const fmt = (n) =>
  new Intl.NumberFormat("id-ID").format(n);

export const getProductStatus = (stock) => {
  if (stock === 0) return { label: "Unavailable", color: "#e24b4a", bg: "#fff1f1" };
  if (stock < 5)  return { label: "Low Stock",   color: "#c47a1a", bg: "#fff8ec" };
  return               { label: "Ready",         color: "#0e7a5a", bg: "#edfaf4" };
};

export const ORDER_STATUS_STYLE = {
  delivered:  { color: "#0e7a5a", bg: "#edfaf4" },
  shipped:    { color: "#185fa5", bg: "#e6f1fb" },
  processing: { color: "#c47a1a", bg: "#fff8ec" },
  pending:    { color: "#888780", bg: "#f4f3f0" },
  cancelled:  { color: "#a32d2d", bg: "#fff1f1" },
};

export const CATEGORY_COLORS = {
  "High Grade":    "#533ab7",
  "Master Grade":  "#0e7a5a",
  "Real Grade":    "#185fa5",
  "Perfect Grade": "#c47a1a",
};
