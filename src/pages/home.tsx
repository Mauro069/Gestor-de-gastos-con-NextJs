import useReports from "@/hooks/useReports";
import styles from "../styles/homePage.module.scss";

function HomePage() {
  const { reports, isLoading, error } = useReports();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <pre>{JSON.stringify(reports, null, 2)}</pre>
    </div>
  );
}

export default HomePage;
