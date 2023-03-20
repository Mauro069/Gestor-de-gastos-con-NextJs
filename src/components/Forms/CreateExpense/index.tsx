import NotificationContext from "@/context/notificationContext";
import useExpenseTypesQuery from "@/hooks/useExpenseTypeById";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { useForm } from "@/hooks";
import { useContext, useState } from "react";

import styles from "./styles.module.scss";

export const CreateExpense = ({ createExpense }: any) => {
  const { query } = useRouter();
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      time: "",
      amount: "",
      description: "",
    },
    onSubmit: async (values) => {
      setLoading(true);

      if (values.time && values.amount && type) {
        const { amount, description, time } = values;

        createExpense({
          date: query?.day,
          hour: time,
          description,
          amount,
          type,
        });

        setType(null)

        // @ts-ignore
        showNotification({
          msj: "Gasto agregado correctamente",
          open: true,
          status: "success",
        });
      } else {
        // @ts-ignore
        showNotification({
          msj: "Te falto enviar algun campo obligatorio!",
          open: true,
          status: "error",
        });
      }

      setLoading(false);
    },
  });
  const { data } = useExpenseTypesQuery("all");

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="time">
            Hora *
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

      <Button
        isLoading={loading}
        textColor="#17161E"
        backgroundColor="#fffff"
        buttonText="Agregar gasto"
      />
    </form>
  );
};
