export const withPoints = (Number: number) => {
  if (Number && !isNaN(Number)) {
    var str = Number.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  }

  return 0;
};
