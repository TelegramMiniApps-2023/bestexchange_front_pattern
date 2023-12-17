import { FC, memo, useCallback, useEffect, useState } from "react";
import ArrowDown from "../../assets/icons/ArrowDown";
import { useFiltersStore, useSelectsStore } from "../../store";

import { Modal } from "../modal/modal";
import styles from "./styles.module.scss";
import { queryClient } from "../../api/queryClient";
import { availableKey, optionsKey } from "../../assets/consts";
import { Categories } from "../../model/Categories";
import { useFetchAvailable } from "../../api/api";

interface SelectProps {
  type: string;
}

export const Select: FC<SelectProps> = ({ type }) => {
  // const { store } = useContext(Context);

  // Zustand
  const setFilter = useFiltersStore((state) => state.setFilter);
  const filter = useFiltersStore((state) => state.filter);
  const give = useSelectsStore((state) => state.giveSelect);
  const get = useSelectsStore((state) => state.getSelect);

  const [show, setShow] = useState(false);
  const options = queryClient.getQueryData<Categories>(optionsKey);
  const { data: availableDirection } = useFetchAvailable({
    base: give?.code_name,
  });
  // const availableDirection = queryClient.getQueryData<Categories>([
  //   availableKey,
  //   give?.code_name,
  // ]);

  const handleModal = useCallback(() => {
    setShow((prevShow) => !prevShow);
    setFilter(null);
  }, [setFilter]);

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
        {type === "give" && options && (
          <Modal
            options={options}
            handleModal={handleModal}
            type={type}
            filter={filter}
          />
        )}
        {type === "get" && availableDirection && (
          <Modal
            options={availableDirection}
            handleModal={handleModal}
            type={type}
            filter={filter}
          />
        )}
      </div>
    </div>
  );
};
