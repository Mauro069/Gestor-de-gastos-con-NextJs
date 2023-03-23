import { ExpenseType } from "@/components/ExpenseType";
import { withPoints } from "@/utils/withPoints";
import { IExpense } from "@/models";
import { Options } from "../Options";

import styles from "./styles.module.scss";
import { useContext, useState } from "react";
import { ExpenseForm } from "@/components/Forms";
import NotificationContext from "@/context/notificationContext";

export const ExpenseItem = ({
  expense,
  deleteExpense,
  isLoadingDeleteExpense,
  editExpense,
  isLoadingEditExpense,
}: {
  expense: IExpense;
  deleteExpense: any;
  isLoadingDeleteExpense: boolean;
  editExpense: any;
  isLoadingEditExpense: boolean;
}) => {
  const [isEditing, setIsEditing] = useState({ open: false, data: null });
  const { showNotification } = useContext(NotificationContext);

  const onDelete = async () => {
    await deleteExpense(expense._id);
  };

  const openEditModal = () => {
    // @ts-ignore
    setIsEditing({ open: true, data: expense });
  };

  const onEdit = async (...props: any) => {
    const [values, { type }] = props;

    if (
      values.description !== expense.description ||
      values.amount !== expense.amount ||
      values.time !== expense.hour ||
      // @ts-ignore
      type._id !== expense.type._id
    ) {
      await editExpense({
        expenseId: expense._id,
        description: values.description,
        hour: values.time,
        type: type._id,
        amount: values.amount,
      });

      setIsEditing({ open: false, data: null });
    } else {
      // @ts-ignore
      showNotification({
        open: true,
        msj: "Debes cambiar algo",
        status: "error",
      });
    }
  };

  return (
    <>
      <div className={styles.expenseContainer}>
        <div className={styles.expense} key={expense?._id}>
          <div className={styles.item}>{expense?.hour}</div>
          <div className={styles.item}>{withPoints(expense?.amount)}</div>
          <div className={styles.item}>
            <ExpenseType expense={expense} />
          </div>
          <div className={styles.item}>-</div>
          <div className={styles.item}>{expense?.description}</div>
        </div>
        <Options
          handleEdit={openEditModal}
          isLoadingDeleteExpense={isLoadingDeleteExpense}
          deleteExpense={onDelete}
        />
      </div>
      {isEditing.open && (
        <>
          <div
            className={styles.editModalContainer}
            onClick={() => setIsEditing({ open: false, data: null })}
          />
          <div className={styles.editModal}>
            <ExpenseForm
              expense={expense}
              onSubmit={onEdit}
              isLoading={isLoadingEditExpense}
              textSubmitButton="Editar Gasto"
              onCancel={() => setIsEditing({ open: false, data: null })}
            />
          </div>
        </>
      )}
    </>
  );
};
