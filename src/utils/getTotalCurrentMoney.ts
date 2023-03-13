import { IReport } from "@/models";
import { withPoints } from "./withPoints";

export const getTotalCurrentMoney = (reports: IReport[]) => {
  let currentMoneyTotal: number | undefined = reports?.reduce((prev, act) => {
    return (prev += act?.currentAmount!);
  }, 0);

  return currentMoneyTotal && withPoints(currentMoneyTotal);
};
