import { Loader } from "@/components/Loader";
import { useState } from "react";

import styles from "./styles.module.scss";

export const Options = ({
  deleteExpense,
  isLoadingDeleteExpense,
  handleEdit,
}: {
  deleteExpense: any;
  isLoadingDeleteExpense: boolean;
  handleEdit: any;
}) => {
  const [modal, setModal] = useState(false);

  return (
    <div onMouseOver={() => setModal(true)} className={styles.options}>
      {!modal && <ThreePoints />}
      {modal && (
        <div onMouseLeave={() => setModal(false)} className={styles.modal}>
          {!isLoadingDeleteExpense ? (
            <>
              <Svg1 onClick={handleEdit} />
              <Svg2 onClick={deleteExpense} />
            </>
          ) : (
            <>
              <Loader size={20} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

const ThreePoints = () => (
  <svg width="3" height="13" viewBox="0 0 3 13" fill="none">
    <path
      d="M1.28571 7.81707C2 7.81707 2.57143 7.23171 2.57143 6.5C2.57143 5.76829 2 5.18293 1.28571 5.18293C0.571428 5.18293 0 5.76829 0 6.5C0 7.23171 0.571428 7.81707 1.28571 7.81707ZM0 11.1829C0 10.4512 0.571428 9.86585 1.28571 9.86585C2 9.86585 2.57143 10.4512 2.57143 11.1829C2.57143 11.9146 2 12.5 1.28571 12.5C0.571428 12.5 0 11.9146 0 11.1829ZM0 1.81707C0 1.08537 0.571428 0.5 1.28571 0.5C2 0.5 2.57143 1.08537 2.57143 1.81707C2.57143 2.54878 2 3.13415 1.28571 3.13415C0.571428 3.13415 0 2.54878 0 1.81707Z"
      fill="white"
    />
  </svg>
);

const Svg1 = ({ onClick }: any) => (
  <svg
    onClick={onClick}
    className={styles.icon}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.7772 0.29131C13.3846 -0.0971034 12.748 -0.0971033 12.3554 0.29131L10.4068 2.21904L13.758 5.53432L15.7066 3.60658C16.0992 3.21817 16.0992 2.58843 15.7066 2.20001L13.7772 0.29131ZM9.14057 5.58496L10.3586 6.79084L2.56667 14.505L1.51553 14.5009L1.51001 13.1394L9.14057 5.58496ZM0.263278 15.9884L3.18859 16L11.4246 7.84617L12.4905 6.79084L11.4246 5.73551L10.2065 4.52963L9.14057 3.4743L8.07461 4.52963L0 12.5237L0.013038 15.7406C0.0135915 15.8772 0.125304 15.9878 0.263278 15.9884Z"
      fill="white"
    />
  </svg>
);

const Svg2 = ({ onClick }: any) => (
  <svg
    onClick={onClick}
    className={styles.icon}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.75 1.5H3.82136L4.56784 0.130361C4.61163 0.0500044 4.69584 0 4.78735 0H10.6814C10.7729 0 10.8571 0.0500043 10.9009 0.130361L11.6474 1.5H14.75C15.1642 1.5 15.5 1.83579 15.5 2.25C15.5 2.66421 15.1642 3 14.75 3H0.75C0.335786 3 0 2.66421 0 2.25C0 1.83579 0.335786 1.5 0.75 1.5ZM2.5 4C2.91421 4 3.25 4.33579 3.25 4.75V5.5V10.4615V13.5C3.25 14.0523 3.69772 14.5 4.25 14.5H11.25C11.8023 14.5 12.25 14.0523 12.25 13.5V10.4615V5.5V4.75C12.25 4.33579 12.5858 4 13 4C13.4142 4 13.75 4.33579 13.75 4.75V5.5V15C13.75 15.5523 13.3023 16 12.75 16H2.75C2.19772 16 1.75 15.5523 1.75 15V5.5V4.75C1.75 4.33579 2.08579 4 2.5 4Z"
      fill="white"
    />
  </svg>
);
