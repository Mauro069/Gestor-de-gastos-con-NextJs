import { CreateReport, ReportsList } from "@/components";
import { useAuth, useReports } from "@/hooks";
import { getTotalCurrentMoney } from "@/utils/getTotalCurrentMoney";
import styles from "../styles/homePage.module.scss";

function HomePage() {
  const { user } = useAuth();
  const { reports, isLoading } = useReports();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className={styles.pageContainer}>
        <div className={styles.welcome}>
          <div>
            <h1>Bienvenido{user?.firstname && `, ${user.firstname}`}!</h1>
            <h4>
              Tienes <b>${getTotalCurrentMoney(reports)}</b> actualmente.
            </h4>
          </div>
          <CreateReport />
        </div>
        <ReportsList reports={reports} />
      </div>
    </main>
  );
}

export default HomePage;
