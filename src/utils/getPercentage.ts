export const getPercentage = (previous: number, current: number) => {
  const dif = current - previous;
  const percentage = dif === current ? current : (dif / previous) * 100;
  return percentage;
};
