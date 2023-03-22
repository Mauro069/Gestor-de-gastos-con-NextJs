import styles from "./styles.module.scss";

export type StatusNotification = "error" | "success" | null;

interface Props {
  status: StatusNotification;
  msj: string | null;
}

export const Notification = ({ status, msj }: Props) => {
  return (
    <div className={styles.notification}>
      <div className={status === "error" ? styles.textRed : styles.textGreen}>
        <p>{msj}</p>
      </div>
    </div>
  );
};
