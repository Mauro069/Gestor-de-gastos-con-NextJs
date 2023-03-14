import { useReports } from "@/hooks";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

interface Props {
  setModal: (modal: boolean) => void;
  modal: boolean;
  reportId: string;
}

interface OptionProps {
  title: string;
  onClick: any;
}

export const ModalOptions = ({ setModal, modal, reportId }: Props) => {
  const router = useRouter();
  const { deleteReport } = useReports();

  const onDelete = async () => {
    await deleteReport(reportId);
  };

  const options: OptionProps[] = [
    {
      title: "Ver detalle",
      onClick: () => router.push(`/report/${reportId}`),
    },
    {
      title: "Borrar",
      onClick: () => onDelete(),
    },
  ];

  return (
    <div className={styles.modalOptions}>
      <Threepoints onClick={() => setModal(!modal)} />
      {modal && (
        <div className={styles.modal}>
          {options.map(({ title, onClick }, i) => (
            <p key={i} onClick={onClick} className={styles.option}>
              {title}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const Threepoints = (props: any) => (
  <svg
    {...props}
    width="5"
    height="22"
    viewBox="0 0 5 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.20833 11.8752C2.87567 11.8752 3.41666 11.3342 3.41666 10.6668C3.41666 9.99948 2.87567 9.4585 2.20833 9.4585C1.54099 9.4585 1 9.99948 1 10.6668C1 11.3342 1.54099 11.8752 2.20833 11.8752Z"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.20833 3.41666C2.87567 3.41666 3.41666 2.87567 3.41666 2.20833C3.41666 1.54099 2.87567 1 2.20833 1C1.54099 1 1 1.54099 1 2.20833C1 2.87567 1.54099 3.41666 2.20833 3.41666Z"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.20833 20.3334C2.87567 20.3334 3.41666 19.7924 3.41666 19.1251C3.41666 18.4577 2.87567 17.9167 2.20833 17.9167C1.54099 17.9167 1 18.4577 1 19.1251C1 19.7924 1.54099 20.3334 2.20833 20.3334Z"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
