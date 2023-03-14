import styles from "./styles.module.scss";

export const ReportsTitles = () => {
  return (
    <div className={styles.reportsTitles}>
      <span>Mes</span>
      <span>Dinero Inicial</span>
      <span>Dinero Gastado</span>
      <span>Dinero Actual</span>
      <span>Porcentaje Gastado</span>
    </div>
  );
};
