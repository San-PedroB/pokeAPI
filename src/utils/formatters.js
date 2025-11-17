export const id3 = (n) => String(n).padStart(3, "0");
export const fmtMeters = (decimeters) => (decimeters / 10).toString().replace(".", ",");
export const fmtKg = (hectograms) => (hectograms / 10).toString().replace(".", ",");
