import styles from "./styles.module.scss";

interface SwitchProps {
  onSwitch: () => void;
  title: string;
  isActive: boolean;
}

export function Switch({ onSwitch, title, isActive }: SwitchProps) {
  return (
    <div
      className={`${isActive && styles.isActive} ${styles.switch}`}
      onClick={onSwitch}
    >
      {title}
    </div>
  );
}
