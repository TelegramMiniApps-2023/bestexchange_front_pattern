import { ReactNode, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import CloseModal from "../../../assets/icons/CloseModal";
import styles from "./popup.module.scss";

type PopupProps = {
  children?: ReactNode;
  closeModal?: () => void;
  show?: boolean;
};

export const Popup = (props: PopupProps) => {
  const { closeModal, children, show } = props;

  // Анимация для появления/исчезновения модального окна
  const modalAnimation = useSpring({
    opacity: show ? 1 : 0,
    transform: show
      ? "translate(-50%, -50%) scale(1)"
      : "translate(-50%, -50%) scale(0.2)",

    from: { transform: "translate(-50%, 100%) scale(0.5)", opacity: 0 },
    config: config.gentle,
  });

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
    <animated.section style={modalAnimation} className={styles.modal}>
      <i>
        <CloseModal width="25px" height="25px" onClick={closeModal} />
      </i>
      {children}
    </animated.section>
  );
};
