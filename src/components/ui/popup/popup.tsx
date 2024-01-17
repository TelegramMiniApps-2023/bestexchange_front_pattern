import { ReactNode, useEffect } from "react";
import CloseModal from "../../../assets/icons/CloseModal";
import styles from "./popup.module.scss";
type PopupProps = {
  children?: ReactNode;
  closeModal?: () => void;
  show?: boolean;
  //Todo closeButton: ReactNode -> если понадобиться более гибкий компонент
};
//Todo обсудить сделать Popup/Modal с помощью createPortal, что бы элемент рендерился вне основного потока DOM
export const Popup = (props: PopupProps) => {
  const { closeModal, children, show } = props;

  //disable scroll over popup
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
    <section className={styles.modal}>
      <i>
        <CloseModal width="25px" height="25px" onClick={closeModal} />
      </i>
      {children}
    </section>
  );
};
