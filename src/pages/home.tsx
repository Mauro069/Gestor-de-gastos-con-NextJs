import { CreateReport } from "@/components";
import { useReports } from "@/hooks";
import { getTotalCurrentMoney } from "@/utils/getTotalCurrentMoney";
import styles from "../styles/homePage.module.scss";

function HomePage() {
  const { reports, isLoading } = useReports();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className={styles.pageContainer}>
        <div className={styles.welcome}>
          <div>
            <h1>Bienvenido!</h1>
            <h4>
              Tienes <b>${getTotalCurrentMoney(reports)}</b> actualmente
            </h4>
          </div>
          <CreateReport />
        </div>
        {/* <ReportsList reports={reports} /> */}
        <pre style={{ color: "white" }}>{JSON.stringify(reports, null, 2)}</pre>
      </div>
    </main>
  );
}

export default HomePage;
