import { Layout } from "@/components/Layout";
import { useReports } from "@/hooks";
import styles from "../styles/homePage.module.scss";

function HomePage() {
  const { reports, isLoading, error } = useReports();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <pre>{JSON.stringify(reports, null, 2)}</pre>
    </Layout>
  );
}

export default HomePage;
