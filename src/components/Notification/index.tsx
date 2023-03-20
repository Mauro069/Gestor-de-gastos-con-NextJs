import { Success } from "./assets/Success";
import { Error } from "./assets/Error";

import styles from "./styles.module.scss";

export type StatusNotification = "error" | "success" | null;

interface Props {
  status: StatusNotification;
  msj: string | null;
}

export const Notification = ({ status, msj }: Props) => {
  return (
    <div className={styles.notification}>
      {status === "error" ? (
        <div className={styles.error}>
          <Error />
        </div>
      ) : (
        <div className={styles.success}>
          <Success />
        </div>
      )}
      <div className={status === "error" ? styles.textRed : styles.textGreen}>
        <p>{msj}</p>
      </div>
    </div>
  );
};
