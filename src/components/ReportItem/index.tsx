import { IReport } from "@/models";
import { useState } from "react";
import {
  colorsAndMessages,
  getStateOfExpenses,
} from "../../utils/percentageUtils";
import { withPoints } from "../../utils/withPoints";
import { ModalOptions, Text } from "./components";

import styles from "./styles.module.scss";

export const ReportItem = ({ initialMoney, month, _id, currentAmount }: IReport) => {
  const [modal, setModal] = useState(false);

  const expense = initialMoney! - currentAmount!;
  const percentage = parseInt((expense / (initialMoney! / 100)).toFixed(2));

  return (
    <div onMouseLeave={() => setModal(false)} className={styles.reportItem}>
      <Text className={styles.month} title="Mes:" data={month} />
      <div className={styles.flex}>
        <Text title="Dinero Inicial:" data={`$${withPoints(initialMoney!)}`} />
        <Text
          title="Dinero Gastado:"
          data={`$${withPoints(initialMoney! - currentAmount!)}`}
        />
        <Text title="Dinero Actual:" data={`$${withPoints(currentAmount!)}`} />
        <Text
          title="Porcentaje Gastado:"
          data={`${percentage}% ${getStateOfExpenses(percentage)!}`}
          styles={{ color: colorsAndMessages[getStateOfExpenses(percentage)!] }}
        />
        {/* @ts-ignore */}
        <ModalOptions modal={modal} setModal={setModal} reportId={_id!} />
      </div>
    </div>
  );
};


