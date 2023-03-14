import { useAuth, useForm, useReports } from "@/hooks";
import { months } from "@/utils/months";
import { useState } from "react";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";

import styles from "./styles.module.scss";

export const CreateReport = () => {
  const [month, setMonth] = useState(null);

  const { user } = useAuth();
  const { createReport, isLoading } = useReports();
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      userRef: user?._id,
      initialMoney: "",
    },
    onSubmit: async (values) => {
      const { userRef, initialMoney } = values;

      if (userRef && initialMoney && month) {
        // @ts-ignore
        await createReport({ userRef, initialMoney, month });
      }
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
        <Button
          backgroundColor="#c75200"
          buttonText="Crear"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};
