import { useAuth, useForm, useReports } from "@/hooks";
import { months } from "@/utils/months";
import { useState } from "react";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";

import styles from "./styles.module.scss";

export const CreateReport = () => {
  const [month, setMonth] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { createReport } = useReports();
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      userRef: user?._id,
      initialMoney: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const { userRef, initialMoney } = values;

      if (userRef && initialMoney && month) {
        // @ts-ignore
        await createReport({ userRef, initialMoney, month });
      }

      setLoading(false);
    },
  });

  const changeMonth = (month: any) => setMonth(month);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h4>Crear reporte</h4>
      <div className={styles.inputs}>
        <Dropdown
          defaultOption={"Mes..."}
          options={months}
          onSelect={changeMonth}
          optionSelected={month}
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
