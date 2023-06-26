export const transformDateToISO = (date: any, type: "start" | "end") => {
  if (date) {
    // 06-03-2023
    // { day: '06', month: '03', year: '2023' }
    const [year, month, day] = date.split("-");

    if (type === "end") {
      return `${year}-${month}-${day}T23:59:59.999Z`;
      // 2022-11-13T00:59:59.999Z
    } else if (type === "start") {
      return `${year}-${month}-${day}T00:00:00.000Z`;
      // 2022-11-13T00:00:00.000Z
    }
  }
};
