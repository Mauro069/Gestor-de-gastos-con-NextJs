import { ChangeEvent } from "react";
import styles from "./styles.module.scss";

interface InputProps {
  label: string;
  type: string;
  value: string;
  name: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  type,
  value,
  name,
  onChange,
  placeholder,
}: InputProps) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <input
        autoComplete="off"
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
