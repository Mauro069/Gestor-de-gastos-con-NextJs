import { IReport } from "@/models";
import { useState } from "react";
import { Pagination } from "../Pagination";
import { ReportItem } from "../ReportItem";
import { NotReports } from "./NotReports";
import { ReportsTitles } from "./ReportsTitles";

import styles from "./styles.module.scss";
interface Props {
  reports: IReport[] | null;
}

export const ReportsList = ({ reports }: Props) => {
  const [page, changePage] = useState(1);
  const perPage = 5;

  let findReports = reports!?.length > 0;

  return (
    <div className={styles.reportsList}>
      <h4>Tus reportes</h4>
      <div className={styles.reports}>
        {findReports && <ReportsTitles />}

        {findReports ? (
          reports
            ?.slice((page - 1) * perPage, (page - 1) * perPage + perPage)
            .map((report) => (
              /* @ts-ignore */
              <ReportItem key={report?._id} {...report} />
            ))
        ) : (
          <NotReports />
        )}

        <Pagination
          page={page}
          perPage={perPage}
          changePage={changePage}
          listItems={reports?.length!}
        />
      </div>
    </div>
  );
};
