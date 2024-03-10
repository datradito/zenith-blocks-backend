export const bigIntToString = (obj) => {
  return JSON.stringify(obj, (key, value) => {
    return typeof value === "bigint" ? value.toString() : value;
  });
};
