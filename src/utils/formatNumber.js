export function formatNumber(val) {
  if (typeof val === "number") {
    return val.toLocaleString("en-US", { maximumFractionDigits: 1 });
  }
  return val; // allow raw strings through
}
