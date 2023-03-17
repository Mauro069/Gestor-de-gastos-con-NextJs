import { Loader } from "../Loader";
import styles from "./styles.module.scss";

interface Props {
  isLoading?: boolean;
  buttonText: string;
  backgroundColor: string;
  textColor?: string;
  onClick?: () => void;
}

export const Button = ({
  isLoading,
  buttonText,
  backgroundColor,
  textColor,
  onClick,
}: Props) => {
  return isLoading ? (
    <div
      style={{ background: backgroundColor }}
      className={styles.loadingContainer}
    >
      <Loader size={25} />
    </div>
  ) : (
    <button
      onClick={onClick}
      style={{ background: backgroundColor, color: textColor }}
      className={styles.button}
      type="submit"
    >
      {buttonText}
    </button>
  );
};
