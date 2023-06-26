import { withPoints } from "@/utils/withPoints";
import styles from "./styles.module.scss";
import { Arrow } from "./components/Arrow";

export const Analitycs = () => {
  const dummyData = {
    monthly: {
      percentage: 23,
      amount: 235000,
      title: "Dinero gastado este mes:",
    },
    weekly: {
      percentage: -20,
      amount: 20000,
      title: "Dinero gastado esta semana:",
    },
    today: {
      percentage: 10,
      amount: 2500,
      title: "Dinero gastado hoy:",
    },
  };

  return (
    <div className={styles.analitycsContainer}>
      <Item {...dummyData.monthly} />
      <Item {...dummyData.weekly} />
      <Item {...dummyData.today} />
    </div>
  );
};

interface ItemProps {
  percentage: number;
  amount: number;
  title: string;
}

const Item = ({ percentage, amount, title }: ItemProps) => {
  const condition = percentage <= 0 ? "less" : "high";

  return (
    <div className={styles.analitycsItem}>
      <div className={styles.left}>
        <p>{title}</p>
        <span>${withPoints(amount)}</span>
      </div>
      <div className={`${styles.percentage} ${styles[condition]}`}>
        <Arrow />
        <p>{percentage}%</p>
      </div>
    </div>
  );
};
