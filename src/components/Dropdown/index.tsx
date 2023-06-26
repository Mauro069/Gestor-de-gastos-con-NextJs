import { useState } from "react";
import styles from "./styles.module.scss";

export interface IOption {
  _id?: string | number;
  name: string;
  bgColor: string;
  color: string;
}

interface Props {
  placeholder: string;
  options: IOption[];
  onSelect: (optionSelected: IOption) => void;
  optionSelected: IOption | null;
}

export const Dropdown = ({
  placeholder,
  options,
  onSelect,
  optionSelected,
}: Props) => {
  const [open, setOpen] = useState(false);
  const optionStyle = (option: IOption) => {
    return {
      background: option.bgColor,
      color: option.color,
    };
  };

  return (
    <div className={styles.selectContainer}>
      <div
        onClick={() => setOpen(!open)}
        className={open ? styles.selectActive : styles.select}
      >
        {optionSelected?.name ? (
          <p className={styles.expenseType} style={optionStyle(optionSelected)}>
            <span>{optionSelected.name}</span>
          </p>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}

        <Svg open={open} />
      </div>
      {open && (
        <div className={styles.options}>
          {options.map((option: IOption) => (
            <div
              key={option._id || option.name}
              className={styles.option}
              onClick={() => {
                setOpen(false);
                onSelect(option);
              }}
            >
              <p className={styles.expenseType} style={optionStyle(option)}>
                <span>{option.name}</span>
              </p>
            </div>
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
