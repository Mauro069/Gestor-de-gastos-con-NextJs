export const transformDateToISO = (date: any, type: "start" | "end") => {
  if (date) {
    // { day: '06', month: '03', year: '2023' }
    const [day, month, year] = date.split("-");

    if (type === "end") {
      return `${year}-${month}-${day}T23:59:59.999Z`;
      // 2022-11-13T00:59:59.999Z
    } else if (type === "start") {
      return `${year}-${month}-${day}T00:00:00.000Z`;
      // 2022-11-13T00:00:00.000Z
    }
  }
};
