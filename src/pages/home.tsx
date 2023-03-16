import { Day } from "@/components";
import { useAuth } from "@/hooks";
import useWeekPicker from "@/hooks/useWeekPicker";
import { months, nameOfsDays } from "@/utils/monthsAndDays";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/homePage.module.scss";

const HomePage = (): JSX.Element => {
  const {
    week,
    handlePrevWeekClick,
    handleNextWeekClick,
    days,
    currentWeekStart,
    currentWeekEnd,
    previousWeekEnd,
    previousWeekStart,
  } = useWeekPicker();
  const { user } = useAuth();

  const [expenseAmount, setExpenseAmount] = useState(null);

  useEffect(() => {
    let fetchExpenseAmount = async () => {
      const { data } = await axios.post("/api/expenses/weekly", {
        currentWeekStart,
        currentWeekEnd,
        previousWeekEnd,
        previousWeekStart,
      });

      console.log({ data });
    };

    fetchExpenseAmount();
  }, [currentWeekStart, currentWeekEnd, previousWeekEnd, previousWeekStart]);

  return (
    <div className={styles.pageContainer}>
      <span className={styles.welcome}>
        Hola, <b>{user?.firstname}!</b>
      </span>
      <div>
        <span>
          Hoy Gastaste <h1>{}</h1>{" "}
        </span>
      </div>

      <div className={styles.weekContainer}>
        <span>
          {/* @ts-ignore */}
          {months[week.month() + 1]} {week.year()}
        </span>
        <div className={styles.week}>
          {nameOfsDays.map((nameOfDay) => (
            <div key={nameOfDay} className={styles.nameOfDay}>
              {nameOfDay}
            </div>
          ))}
        </div>
        <div className={styles.week}>
          {days.map((day) => (
            <Day key={day} day={day} />
          ))}
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handlePrevWeekClick}>
            <ArrowSvg />
          </button>
          <button className={styles.button} onClick={handleNextWeekClick}>
            <ArrowSvg />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

const ArrowSvg = () => (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.275 10.8749C6.09167 11.0582 5.85833 11.1499 5.575 11.1499C5.29167 11.1499 5.05833 11.0582 4.875 10.8749L0.274999 6.2749C0.174999 6.1749 0.104 6.06657 0.062 5.9499C0.0206667 5.83324 -2.37863e-07 5.70824 -2.43691e-07 5.5749C-2.49519e-07 5.44157 0.0249996 5.31224 0.0749995 5.1869C0.125 5.06224 0.191666 4.95824 0.274999 4.8749L4.875 0.274903C5.05833 0.0915697 5.29167 -9.84598e-05 5.575 -9.84721e-05C5.85833 -9.84845e-05 6.09167 0.0915696 6.275 0.274903C6.45833 0.458236 6.55 0.691568 6.55 0.974902C6.55 1.25824 6.45833 1.49157 6.275 1.6749L2.375 5.5749L6.275 9.4749C6.45833 9.65824 6.55 9.89157 6.55 10.1749C6.55 10.4582 6.45833 10.6916 6.275 10.8749Z"
      fill="#17161E"
    />
  </svg>
);
