import { FC, useCallback, useEffect, useState } from "react";
import ArrowDown from "../../assets/icons/ArrowDown";
import { useFiltersStore, useSelectsStore } from "../../store/store";

import { useFetchAvailable } from "../../api/api";
import { queryClient } from "../../api/queryClient";
import { availableKey } from "../../assets/consts";
import { Categories } from "../../model/Categories";
import { Modal } from "../modal/modal";
import styles from "./styles.module.scss";

interface SelectProps {
  type: string;
}

export const Select: FC<SelectProps> = ({ type }) => {
  // Zustand
  const setFilter = useFiltersStore((state) => state.setFilter);
  const setSearch = useFiltersStore((state) => state.setSearch);
  const filter = useFiltersStore((state) => state.filter);
  const give = useSelectsStore((state) => state.giveSelect);
  const get = useSelectsStore((state) => state.getSelect);
  const setGiveSelect = useSelectsStore((state) => state.setGiveSelect);
  const setGetSelect = useSelectsStore((state) => state.setGetSelect);

  const [show, setShow] = useState(false);
  // const { data:options } = useFetchAvailable({ base: "all" });
  const options = queryClient.getQueryData<Categories>([availableKey, "all"]);

  const { data: availableDirection, error } = useFetchAvailable({
    base: give?.code_name,
  });

  useEffect(() => {
    if (error) {
      // setGiveSelect(null);
      setGetSelect(null);
    }
  }, [error]);

  const handleModal = useCallback(() => {
    setShow((prevShow) => !prevShow);
    setFilter(null);
    setSearch("");
  }, [setFilter, setSearch]);

  return (
    <div className={styles.select}>
      <p className={styles.select__label}>
        {type === "give" ? "Выберите что отдаёте" : "Выберите что получаете"}
      </p>
      <div
        className={
          (!availableDirection && type === "get") || (!give && type === "get")
            ? `${styles.select__input} ${styles.active}`
            : styles.select__input
        }
        onClick={() => {
          handleModal();
        }}
      >
        {type === "give" && give ? (
          give.name
        ) : get && !error ? (
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
        {type === "get" && (
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
