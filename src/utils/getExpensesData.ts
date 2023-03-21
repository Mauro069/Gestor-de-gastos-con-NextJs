export function getExpenseData(expenses: any) {
  const expenseData: any = [];
  const expenseTypes: any = {};

  // Primero, se recorren los gastos para obtener la información de los tipos de gasto y calcular el total gastado por cada tipo
  expenses.forEach((expense: any) => {
    const { type, amount } = expense;
    const typeId = type._id.toString();
    if (!expenseTypes[typeId]) {
      expenseTypes[typeId] = {
        name: type.name,
        color: type.color,
        totalAmount: 0,
      };
    }
    expenseTypes[typeId].totalAmount += amount;
  });

  // Luego, se recorren los tipos de gasto para calcular el porcentaje gastado por cada tipo
  const totalExpenses: any = Object.values(expenseTypes).reduce(
    (total, type: any) => total + type.totalAmount,
    0
  );
  Object.values(expenseTypes).forEach((type: any) => {
    const percentage = ((type.totalAmount / totalExpenses) * 100).toFixed(2);
    expenseData.push({
      name: type.name,
      color: "#" + type.color,
      percentage: parseFloat(percentage),
      totalAmount: type.totalAmount,
    });
  });

  return expenseData;
}
