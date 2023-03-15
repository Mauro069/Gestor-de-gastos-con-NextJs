import { CreateReport, ReportsList } from "@/components";
import { useExpenses, useReport } from "@/hooks";
import { getTotalCurrentMoney } from "@/utils/getTotalCurrentMoney";
import { useRouter } from "next/router";

import styles from "../../styles/reportDetail.module.scss";

function ReportDetail() {
  const { query } = useRouter();
  let reportId = query.reportId;

  // const { report, isLoading: isLoadingReport } = useReport(reportId);
  const {
    expenses,
    isLoading: isLoadingExpenses,
    createExpense,
  } = useExpenses("6411f1e28ff1749bb7adb5f4");

  if (isLoadingExpenses) {
    return <div>Loading...</div>;
  }

  console.log({ expenses });

  const onClick = () => {
    console.log("first");
    createExpense()
  };

  return (
    <main>
      <pre>{JSON.stringify({ expenses }, null, 2)}</pre>
      <button onClick={() => onClick()}>Crear Gasto</button>
    </main>
  );
}

export default ReportDetail;
