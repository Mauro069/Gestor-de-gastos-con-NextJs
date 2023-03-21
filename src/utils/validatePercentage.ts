export const validatePercentage = (
  percentage: number,
  return1: any,
  return2: any,
  defaultValue?: any
) => {
  switch (true) {
    case Number(percentage) > 0:
      return return1;
    case Number(percentage) < 0:
      return return2;
    default:
      return defaultValue || null;
  }
};
