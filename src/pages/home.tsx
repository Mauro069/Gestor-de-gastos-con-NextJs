import { useAuth, useWeeklyExpenses, useWeekPicker } from "@/hooks";
import { validatePercentage } from "@/utils/validatePercentage";
import { months, nameOfsDays } from "@/utils/monthsAndDays";
import { withPoints } from "@/utils/withPoints";
import { Day, ExpenseType, Loader } from "@/components";

import styles from "../styles/homePage.module.scss";
import useMonthlyExpenses from "@/hooks/useMonthlyExpenses";
import useExpenseTypesQuery from "@/hooks/useExpenseTypeById";

const HomePage = (): JSX.Element => {
  const {
    week,
    handlePrevWeekClick,
    handleNextWeekClick,
    days,
    prevWeekEnd,
    prevWeekStart,
  } = useWeekPicker();
  const { user } = useAuth();
  const { isLoading, data }: any = useWeeklyExpenses(
    days,
    prevWeekEnd,
    prevWeekStart
  );

  const {
    data: monthlyExpenses,
    isLoading: isLoadingMonthlyExpenses,
    // @ts-ignore
  } = useMonthlyExpenses(week?.format("YYYY-MM"));

  const { data: monthlyType } = useExpenseTypesQuery(
    monthlyExpenses!?.maxExpenseType ? [monthlyExpenses!?.maxExpenseType] : []
  );
  console.log({ monthlyType });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topContainer}>
        <div className={styles.welcomeContainer}>
          <span className={styles.welcome}>
            Hola, <b>{user?.firstname}!</b>
          </span>
          <div className={styles.expensesAmountContainer}>
            <span className={styles.subtitle}>
              {validatePercentage(
                data?.percentage,
                "Esta semana gastaste más que la semana anterior",
                "Esta semana gastaste menos que la semana anterior"
              )}
            </span>
            <div className={styles.expensesAmount}>
              <h1>${withPoints(data?.thisWeekExpensesAmount)}</h1>{" "}
              <div
                style={{
                  background: validatePercentage(
                    data?.percentage,
                    "#FF0000",
                    "#01BB1F",
                    "#FCC70A"
                  ),
                }}
                className={styles.percentage}
              >
                {withPoints(data?.percentage)}%
              </div>
            </div>
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.maxExpense}>
            <span>Dinero gastado este mes:</span>
            <p>${withPoints(monthlyExpenses!?.totalAmount)}</p>
            <div
              style={{
                background: validatePercentage(
                  monthlyExpenses!?.percentage,
                  "#FF0000",
                  "#01BB1F",
                  "#FCC70A"
                ),
              }}
              className={styles.percentage}
            >
              {withPoints(monthlyExpenses!?.percentage)}%
            </div>
          </div>
          <div className={styles.maxExpense}>
            <span>Gasto importante del mes:</span>

            <div className={styles.flex}>
              <p>${withPoints(monthlyExpenses!?.maxExpenseAmount)}</p>
              {monthlyType?.length > 0 && <ExpenseType type={monthlyType[0]} />}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.weekContainer}>
        <span>
          {/* @ts-ignore */}
          {months[week?.month() + 1]} {week?.year()}
        </span>
        <div className={styles.weekNames}>
          {nameOfsDays.map((nameOfDay) => (
            <div key={nameOfDay} className={styles.nameOfDay}>
              {nameOfDay}
            </div>
          ))}
        </div>
        <div className={styles.week}>
          {!isLoading && data?.weekExpenses ? (
            data?.weekExpenses.map(({ date, expenses }: any, index: number) => (
              <Day key={date} day={date} expenses={expenses} dayName={index} />
            ))
          ) : (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          )}
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
