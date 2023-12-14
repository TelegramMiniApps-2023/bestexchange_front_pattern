import { FC, useContext, useState } from "react";
import styles from "./styles.module.scss";
import { Modal } from "../modal";
import ArrowDown from "../../assets/icons/ArrowDown";
import { Context } from "../../main";
import { useFiltersStore, useSelectsStore } from "../../store";

interface SelectProps {
  type: string;
}

export const Select: FC<SelectProps> = ({ type }) => {
  const { store } = useContext(Context);

  const [show, setShow] = useState(false);

  // Zustand
  const setFilter = useFiltersStore((state) => state.setFilter);
  const filter = useFiltersStore((state) => state.filter);
  const give = useSelectsStore((state) => state.giveSelect);
  const get = useSelectsStore((state) => state.getSelect);

  const handleModal = () => {
    setShow(!show);
    setFilter(null);
  };

  return (
    <div className={styles.select}>
      <p className={styles.select__label}>
        {type === "give" ? "Выберите что отдаёте" : "Выберите что получаете"}
      </p>
      <div
        className={
          !give && type === "get"
            ? `${styles.select__input} ${styles.active}`
            : styles.select__input
        }
        onClick={() => {
          handleModal();
        }}
      >
        {type === "give" && give ? (
          give.name
        ) : get ? (
          get.name
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
            filter={filter}
          />
        )}
        {type === "get" && store.available?.data && (
          <Modal
            options={store.available.data}
            handleModal={handleModal}
            type={type}
            filter={filter}
          />
        )}
      </div>
    </div>
  );
};
