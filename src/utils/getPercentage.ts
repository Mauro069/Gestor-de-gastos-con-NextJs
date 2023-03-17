export const getPercentage = (previous: number, current: number) => {
  console.log("previous =>", previous)
  console.log("current =>", current)

  const dif = current - previous;
  const percentage = dif === current ? current : (dif / previous) * 100;
  return percentage.toFixed(2);
};
