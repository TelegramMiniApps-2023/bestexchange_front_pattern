import { FC, ReactNode, useEffect } from "react";
import styles from "./popupCustom.module.scss";
import clsx from "clsx";
import CloseModal from "../../../assets/icons/CloseModal";

type PopupCustomProps = {
  children?: ReactNode;
  closeModal?: () => void;
  show?: boolean;
};

export const PopupCustom: FC<PopupCustomProps> = (props) => {
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
    // <div
    //   className={clsx(styles.main_wrapper, {
    //     [styles.active]: show,
    //   })}
    // >
    //   <div className={styles.popup}>
    //     {/* <div className={styles.popup_inside}>
    //       <div className={styles.backgrounds}>
    //         <div className={styles.background}></div>
    //         <div className={`${styles.background} ${styles.background2}`}></div>
    //         <div className={`${styles.background} ${styles.background3}`}></div>
    //         <div className={`${styles.background} ${styles.background4}`}></div>
    //         <div className={`${styles.background} ${styles.background5}`}></div>
    //         <div className={`${styles.background} ${styles.background6}`}></div>
    //       </div>
    //     </div> */}
    //     <i>
    //       <CloseModal width="25px" height="25px" onClick={closeModal} />
    //     </i>
    //     <div className={styles.content}>{children}</div>
    //   </div>
    // </div>
    <div
      className={clsx(styles.popup, {
        [styles.active]: show,
      })}
    >
      <div className={styles.backgrounds}>
        <div className={styles.background}></div>
        <div className={`${styles.background} ${styles.background2}`}></div>
        <div className={`${styles.background} ${styles.background3}`}></div>
        <div className={`${styles.background} ${styles.background4}`}></div>
        <div className={`${styles.background} ${styles.background5}`}></div>
        <div className={`${styles.background} ${styles.background6}`}></div>
      </div>
      <i>
        <CloseModal width="25px" height="25px" onClick={closeModal} />
      </i>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
