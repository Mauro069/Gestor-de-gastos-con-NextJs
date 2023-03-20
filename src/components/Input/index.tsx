import { ChangeEvent } from "react";
import styles from "./styles.module.scss";

interface InputProps {
  label: string;
  type: string;
  value: string;
  name: string;
  error?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  label,
  type,
  value,
  name,
  onChange,
  placeholder,
  error,
}: InputProps) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span>{error}</span>}
    </div>
  );
};
