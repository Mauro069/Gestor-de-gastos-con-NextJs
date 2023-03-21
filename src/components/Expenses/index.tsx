import { ExpenseItem } from "./components/ExpenseItem";
import { useEffect, useRef, useState } from "react";
import { IExpense } from "@/models";

import styles from "./styles.module.scss";
import { Loader } from "../Loader";

export const Expenses = ({
  expenses,
  isLoading,
}: {
  expenses: IExpense[];
  isLoading: boolean;
}) => {
  const titles = [
    "Hora",
    "Importe",
    "Tipo de gasto",
    "Metodo de pago",
    "Descripción",
  ];

  const containerRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(true);

  useEffect(() => {
    const container = containerRef.current;

    function handleScroll() {
      /* @ts-ignore */
      const containerHeight = container?.offsetHeight;
      /* @ts-ignore */
      const containerScrollHeight = container?.scrollHeight;
      /* @ts-ignore */
      const containerScrollTop = container?.scrollTop;

      if (containerHeight + containerScrollTop === containerScrollHeight) {
        setShowScrollBtn(false);
      } else {
        setShowScrollBtn(true);
      }
    }
    /* @ts-ignore */
    container?.addEventListener("scroll", handleScroll);
    /* @ts-ignore */
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScrollToTop() {
    /* @ts-ignore */
    containerRef.current.scrollTo({
      /* @ts-ignore */
      top: containerRef.current.scrollHeight,
      behavior: "smooth", // Utiliza scroll suave
    });
  }

  return (
    <div className={styles.expensesContainer}>
      <span className={styles.subtitle}>Tus movimientos del dia</span>
      <div className={styles.titlesAndExpensesContainer}>
        <div className={styles.titlesContainer}>
          {titles.map((title: string) => (
            <div className={styles.title} key={title}>
              {title}
            </div>
          ))}
        </div>
        <div className={styles.expensesList} ref={containerRef}>
          {expenses?.length > 0 &&
            expenses?.map((expense: IExpense) => (
              <ExpenseItem key={expense._id} expense={expense} />
            ))}
          {isLoading && (
            <div className={styles.notFound}>
              <Loader />
            </div>
          )}
          {!isLoading && expenses?.length === 0 && (
            <div className={styles.notFound}>
              Aún no has cargado ningun gasto...
            </div>
          )}
          {expenses?.length > 8 && (
            <button
              className={styles.scrollBtn}
              style={{ display: showScrollBtn ? "block" : "none" }}
              onClick={handleScrollToTop}
            >
              Ver mas
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
