import { FC, useContext, useState } from "react";
import styles from "./styles.module.scss";
import { Modal } from "../modal";
import ArrowDown from "../../assets/icons/ArrowDown";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

interface SelectProps {
  type: string;
}

export const Select: FC<SelectProps> = observer(({ type }) => {
  const { store } = useContext(Context);

  const [show, setShow] = useState(false);
  const handleModal = () => {
    setShow(!show);
    store.setFilter(null);
  };

  return (
    <div className={styles.select}>
      <p className={styles.select__label}>
        {type === "give" ? "Выберите что отдаёте" : "Выберите что получаете"}
      </p>
      <div
        className={
          !store.give && type === "get"
            ? `${styles.select__input} ${styles.active}`
            : styles.select__input
        }
        onClick={() => {
          handleModal();
        }}
      >
        {type === "give" && store.give ? (
          store.give.name
        ) : store.get ? (
          store.get.name
        ) : (
          <span>Не выбрано...</span>
        )}
        <span className={styles.input__icon}>
          <ArrowDown width="20px" height="20px" fill="#fff" />
        </span>
      </div>
      <div className={show ? `${styles.modal} ${styles.active}` : styles.modal}>
        {type === "give" && store.options?.data && (
          <Modal
            options={store.options.data}
            handleModal={handleModal}
            type={type}
            filter={store.filter}
          />
        )}
        {type === "get" && store.available?.data && (
          <Modal
            options={store.available.data}
            handleModal={handleModal}
            type={type}
            filter={store.filter}
          />
        )}
      </div>
    </div>
  );
});
