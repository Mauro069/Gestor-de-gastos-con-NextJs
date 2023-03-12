import styles from "./styles.module.scss";

export function Layout({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  return (
    <main className={styles.layout}>
      <h1 className={styles.title}>Gestify</h1>
      {children}
    </main>
  );
}
