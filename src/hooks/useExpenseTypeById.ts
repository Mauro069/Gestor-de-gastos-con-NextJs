import { useQuery } from "react-query";

const useExpenseTypesQuery = (typeIds: any) => {
  const queryKey = ["expenseTypes", typeIds];

  return useQuery(queryKey, async () => {
    if (typeIds.length > 0) {
      const res = await fetch(`/api/expense-type?ids=${typeIds.join("-")}`);
      if (!res.ok) {
        throw new Error("Failed to fetch expense types");
      }
      const data = await res.json();
      return data?.expenseTypes;
    }
  });
};

export default useExpenseTypesQuery;
