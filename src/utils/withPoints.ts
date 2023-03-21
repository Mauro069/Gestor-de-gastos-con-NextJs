export const withPoints = (Number: number) => {
  if (Number && !isNaN(Number)) {
    return Number.toLocaleString("es", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  return 0;
};
