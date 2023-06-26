import { Dropdown, IOption } from "@/components/Dropdown";
import { useActivities, useForm } from "@/hooks";
import { useState } from "react";

import styles from "./styles.module.scss";
import { ActivityType, IActivity } from "@/models/Activity";

export const ActivityForm = () => {
  const [activityType, setActivityType] = useState(null);
  const data: IOption[] = [
    {
      _id: 1,
      name: "Entrada",
      bgColor: "#d1fae5",
      color: "#047857",
    },
    {
      _id: 2,
      name: "Gasto",
      bgColor: "#fad1d1",
      color: "#780404",
    },
  ];

  const { createActivity } = useActivities({});

  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      date: "",
      amount: "",
      description: "",
    },
    onSubmit: async (values) => {
      console.log({ ...values, activityType });

      const newActivity: IActivity = {
        ...values,
        type:
          activityType === "Entrada"
            ? ActivityType.Entry
            : ActivityType.Expense,
      };

      await createActivity(newActivity);
    },
  });

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Nuevo movimiento</h3>
      <div className={styles.row}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="date">
            Fecha
          </label>
          <input
            onChange={handleChange}
            className={styles.input}
            id="date"
            name="date"
            value={values.date}
            type="date"
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="amount">
            Importe
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
          Tipo de movimiento
        </label>
        <Dropdown
          placeholder="Tipo de movimiento"
          optionSelected={activityType}
          // @ts-ignore
          onSelect={(option) => setActivityType(option)}
          options={data}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="description">
          Descripción (opcional)
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
      <button type="submit">Crear</button>
    </form>
  );
};
