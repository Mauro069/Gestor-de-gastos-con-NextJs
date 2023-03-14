import { CreateReport, ReportsList } from "@/components";
import { useReport } from "@/hooks";
import { getTotalCurrentMoney } from "@/utils/getTotalCurrentMoney";
import { useRouter } from "next/router";

import styles from "../../styles/reportDetail.module.scss";

function ReportDetail() {
  const { query } = useRouter();
  let reportId = query.reportId;

  const { report, isLoading } = useReport(reportId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <pre>{JSON.stringify(report, null, 2)}</pre>
    </main>
  );
}

export default ReportDetail;
