import useExpenseTypesQuery from "@/hooks/useExpenseTypeById";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/Button";
import { useForm } from "@/hooks";
import { useState } from "react";

import styles from "./styles.module.scss";

export const ExpenseForm = ({
  expense,
  onSubmit,
  isLoading,
  textSubmitButton,
  onCancel,
}: any) => {
  const [type, setType] = useState(expense?.type || null);
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      time: expense?.hour || "",
      amount: expense?.amount || "",
      description: expense?.description || "",
    },
    onSubmit: async (values) => {
      onSubmit(values, { type, setType });
    },
  });
  const { data } = useExpenseTypesQuery("all");

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="time">
            Hora
          </label>
          <input
            onChange={handleChange}
            className={styles.input}
            id="time"
            name="time"
            value={values.time}
            type="time"
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="amount">
            Importe *
          </label>
          <input
            onChange={handleChange}
            className={styles.input}
            id="amount"
            name="amount"
            type="number"
            value={values.amount}
            placeholder="Cantidad"
          />
        </div>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="type">
          Tipo de gasto *
        </label>
        <Dropdown
          placeholder="Tipo de gasto..."
          optionSelected={type}
          // @ts-ignore
          onSelect={(option) => setType(option)}
          options={data}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="description">
          Descripción
        </label>
        <textarea
          onChange={handleChange}
          className={styles.textarea}
          id="description"
          name="description"
          value={values.description}
          placeholder="Descripción..."
        />
      </div>

      <div className={styles.buttonsContainer}>
        {onCancel && !isLoading && (
          <Button
            onClick={onCancel}
            textColor="#ffffff"
            backgroundColor="rgba(252, 59, 59, 0.5)"
            buttonText="Cancelar"
          />
        )}

        <Button
          isLoading={isLoading}
          textColor="#17161E"
          backgroundColor="#fffff"
          buttonText={textSubmitButton}
        />
      </div>
    </form>
  );
};
