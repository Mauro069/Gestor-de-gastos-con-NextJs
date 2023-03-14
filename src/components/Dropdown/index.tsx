import { useState } from "react";
import styles from "./styles.module.scss";

interface Props {
  defaultOption: string;
  options: any[];
  onSelect: (optionSelected: string) => void;
  optionSelected: string | null;
}

export const Dropdown = ({
  defaultOption,
  options,
  onSelect,
  optionSelected,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.selectContainer}>
      <div
        onClick={() => setOpen(!open)}
        className={open ? styles.selectActive : styles.select}
      >
        <span className={!optionSelected ? styles.withOpacity : ""}>
          {optionSelected || defaultOption}
        </span>
        <Svg open={open} />
      </div>
      {open && (
        <div className={styles.options}>
          {options.map((option: string) => (
            <p
              onClick={() => {
                setOpen(false);
                onSelect(option);
              }}
              key={option}
              className={styles.option}
            >
              <span>{option}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const Svg = ({ open }: { open: boolean }) => (
  <svg
    className={open ? styles.active : styles.svg}
    width="9"
    height="6"
    viewBox="0 0 9 6"
    fill="2c2c2c"
  >
    <path
      d="M1.2505 5.07401L4.08408 2.26019L6.91767 5.07401C7.20249 5.35684 7.66258 5.35684 7.9474 5.07401C8.23222 4.79118 8.23222 4.33429 7.9474 4.05146L4.5953 0.722746C4.31048 0.439914 3.85039 0.439914 3.56557 0.722746L0.213471 4.05146C-0.0713481 4.33429 -0.0713482 4.79118 0.21347 5.07401C0.498289 5.34959 0.965684 5.35684 1.2505 5.07401Z"
      fill="white"
    />
  </svg>
);
