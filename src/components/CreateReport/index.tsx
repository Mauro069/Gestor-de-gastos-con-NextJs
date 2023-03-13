import { useAuth, useForm, useReports } from "@/hooks";
import { useState } from "react";
import { Button } from "../Button";

import styles from "./styles.module.scss";

export const CreateReport = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { createReport } = useReports();
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      userRef: user?._id,
      month: "",
      initialMoney: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const { userRef, initialMoney, month } = values;

      if (userRef && initialMoney && month) {
        // @ts-ignore
        await createReport({ userRef, initialMoney, month });
      }

      setLoading(false);
    },
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h4>Crear reporte</h4>
      <div className={styles.inputs}>
        <input
          className={styles.input}
          onChange={handleChange}
          value={values.month}
          placeholder="Mes..."
          name="month"
          type="text"
        />
        <input
          onChange={handleChange}
          className={styles.input}
          value={values.initialMoney}
          placeholder="Dinero Inicial..."
          name="initialMoney"
          type="text"
        />
        <Button buttonText="Crear" isLoading={loading} />
      </div>
    </form>
  );
};
