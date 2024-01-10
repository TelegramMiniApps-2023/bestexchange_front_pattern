import { ReactNode } from "react";
import CloseModal from "../../../assets/icons/CloseModal";
import styles from "./popup.module.scss";
type PopupProps = {
  children?: ReactNode;
  closeModal?: () => void;
  //Todo closeButton: ReactNode -> если понадобиться более гибкий компонент
};
//Todo обсудить сделать Popup/Modal с помощью createPortal, что бы элемент рендерился вне основного потока DOM
export const Popup = (props: PopupProps) => {
  const { closeModal, children } = props;
  return (
    <section className={styles.modal}>
      <span className={styles.modal__close}>
        <CloseModal width="20px" height="20px" onClick={closeModal} />
      </span>
      {children}
    </section>
  );
};
