import clsx from "clsx";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { useFetchAvailable } from "../../api/api";
import { queryClient } from "../../api/queryClient";
import { availableKey } from "../../assets/consts";
import { Categories } from "../../model/Categories";
import {
  useCashStore,
  useDirectionTabsStore,
  useFiltersStore,
  useSelectsStore,
} from "../../store/store";
import { Modal } from "../modal/modal";
import { SelectCard } from "../selectCard";
import styles from "./styles.module.scss";

interface SelectProps {
  type: "give" | "get";
  // Верхние табы наличные/безналичные
  // typeExchange?: "cash" | "noCash";
}

export const Select: FC<SelectProps> = memo(({ type }) => {
  const { setFilter, setSearch, filter } = useFiltersStore((state) => state);
  const give = useSelectsStore((state) => state.giveSelect);
  const get = useSelectsStore((state) => state.getSelect);
  const setGetSelect = useSelectsStore((state) => state.setGetSelect);
  const typeValute = useDirectionTabsStore((state) => state.typeValute);
  // const location = useCashStore(state=>state.location)

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
    <>
      <SelectCard
        error={error}
        get={get}
        give={give}
        handleModal={handleModal}
        type={type}
        availableDirection={availableDirection}
        typeValute={typeValute}
      />
      <div className={clsx(styles.modal, { [styles.active]: show })}>
        {type === "give" && (
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
    </>
  );
});
