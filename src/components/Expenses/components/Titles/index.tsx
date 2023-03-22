import styles from "./styles.module.scss";

export const Titles = ({ titles }: { titles: string[] }) => {
  return (
    <div className={styles.titlesContainer}>
      {titles.map((title: string) => (
        <div className={styles.title} key={title}>
          {title}
        </div>
      ))}
    </div>
  );
};
