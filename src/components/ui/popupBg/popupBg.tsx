import { FC, ReactNode, useEffect } from "react";
import styles from "./popupBg.module.scss";
import clsx from "clsx";
import CloseModal from "../../../assets/icons/CloseModal";

type PopupBgProps = {
  children?: ReactNode;
  closeModal?: () => void;
  show?: boolean;
};

export const PopupBg: FC<PopupBgProps> = (props) => {
  const { closeModal, children, show } = props;

  // Задаем класс для body в зависимости от статуса модального окна
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [show]);

  return (
    <div
      className={clsx(styles.popup, {
        [styles.active]: show,
      })}
    >
      <div className={styles.backgrounds}>
        <div className={styles.background}></div>
        <div className={`${styles.background} ${styles.background6}`}></div>
        <div className={styles.content}>{children}</div>
      </div>
      <i>
        <CloseModal width="25px" height="25px" onClick={closeModal} />
      </i>
    </div>
  );
};
