import styles from "./styles.module.scss";

interface Props {
  page: number;
  changePage: (page: number) => void;
  perPage: number;
  listItems: number;
}

export const Pagination = ({ page, changePage, perPage, listItems }: Props) => {
  const lastPage = Math.ceil(listItems / perPage) || 1;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.previous}
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
      >
        <Arrow />
      </button>

      <p>
        <b>{page}</b> de {lastPage}
      </p>

      <button
        className={styles.next}
        disabled={page === lastPage}
        onClick={() => changePage(page + 1)}
      >
        <Arrow />
      </button>
    </div>
  );
};

const Arrow = () => (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 7.5C16 7.78411 15.8947 8.05658 15.7071 8.25748C15.5196 8.45837 15.2653 8.57124 15.0001 8.57124L3.41541 8.57124L7.70893 13.169C7.80189 13.2686 7.87564 13.3868 7.92595 13.517C7.97626 13.6471 8.00216 13.7866 8.00216 13.9274C8.00216 14.0683 7.97626 14.2077 7.92595 14.3379C7.87564 14.468 7.80189 14.5862 7.70893 14.6858C7.61596 14.7854 7.50559 14.8645 7.38413 14.9184C7.26266 14.9723 7.13248 15 7.00101 15C6.86953 15 6.73935 14.9723 6.61788 14.9184C6.49642 14.8645 6.38605 14.7854 6.29308 14.6858L0.293755 8.25843C0.200638 8.15893 0.126762 8.04071 0.0763546 7.91057C0.0259472 7.78042 6.1968e-07 7.6409 6.25839e-07 7.5C6.31998e-07 7.3591 0.0259473 7.21958 0.0763547 7.08943C0.126762 6.95929 0.200638 6.84107 0.293755 6.74157L6.29309 0.314154C6.38605 0.214555 6.49642 0.135548 6.61788 0.0816456C6.73935 0.027743 6.86953 -3.99105e-07 7.00101 -3.93359e-07C7.13248 -3.87612e-07 7.26266 0.027743 7.38413 0.0816456C7.5056 0.135548 7.61596 0.214555 7.70893 0.314154C7.89668 0.515303 8.00216 0.78812 8.00216 1.07259C8.00216 1.21344 7.97626 1.35292 7.92595 1.48305C7.87564 1.61318 7.80189 1.73142 7.70893 1.83102L3.41541 6.42876L15.0001 6.42877C15.2653 6.42877 15.5196 6.54163 15.7071 6.74252C15.8947 6.94342 16 7.21589 16 7.5Z"
      fill="#E7E7E7"
    />
  </svg>
);
