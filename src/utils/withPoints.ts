export const withPoints = (Number: number | string) => {
  if (Number) {
    var str = Number.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  }

  return null;
};
