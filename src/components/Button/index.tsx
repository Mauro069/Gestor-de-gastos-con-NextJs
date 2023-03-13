import { Loader } from "../Loader";
import styles from "./styles.module.scss";

interface Props {
  isLoading?: boolean;
  buttonText: string;
}

export const Button = ({ isLoading, buttonText }: Props) => {
  return isLoading ? (
    <div className={styles.loadingContainer}>
      <Loader /> Cargando...
    </div>
  ) : (
    <button className={styles.button} type="submit">
      {buttonText}
    </button>
  );
};
