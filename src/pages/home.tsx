import { useAuth } from "@/hooks/useAuth";
import styles from "../styles/homePage.module.scss";

function HomePage() {
  const { user } = useAuth();

  return (
    <div className={styles.layout}>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export default HomePage;
