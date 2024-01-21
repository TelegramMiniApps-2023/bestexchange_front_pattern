import clsx from "clsx";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { ResFetchAvailable, useFetchAvailable } from "../../api/api";
import { queryClient } from "../../api/queryClient";
import { availableKey } from "../../assets/consts";
import {
  useCashStore,
  useDirectionTabsStore,
  useFiltersStore,
  useSelectsStore,
} from "../../store/store";
import { Modal } from "../modal/modal";
import { SelectCard } from "../selectCard";
import styles from "./select.module.scss";
import { useTranslation } from "react-i18next";

interface SelectProps {
  type: "give" | "get";
}

export const Select: FC<SelectProps> = memo(({ type }) => {
  const { setFilter, setSearch, filter } = useFiltersStore((state) => state);
  const give = useSelectsStore((state) => state.giveSelect);
  const get = useSelectsStore((state) => state.getSelect);
  const setGetSelect = useSelectsStore((state) => state.setGetSelect);
  const setGiveSelect = useSelectsStore((state) => state.setGiveSelect);
  const { i18n } = useTranslation();
  const typeValute = useDirectionTabsStore((state) => state.typeValute);
  const city = useCashStore((state) => state.location);
  const [show, setShow] = useState(false);

  const options = queryClient.getQueryData<ResFetchAvailable>([
    availableKey,
    "all",
    city?.location.city.code_name,
  ]);
  const currentOptions = i18n.language === "ru" ? options?.ru : options?.en;
  const { data: availableDirection, error } = useFetchAvailable({
    base: give?.code_name,
    city: city?.location.city.code_name,
  });
  const currentAvailableDirection =
    i18n.language === "ru" ? availableDirection?.ru : availableDirection?.en;

  useEffect(() => {
    if (error) {
      setGetSelect(null);
    }
  }, [error]);

  useEffect(() => {
    if (currentOptions) {
      if (give) {
        const currGive = Object.values(currentOptions)
          .flat()
          .filter((el) => el.id === give.id);
        setGiveSelect(currGive[0]);
      }
    }
    if (currentAvailableDirection) {
      if (get) {
        const currGet = Object.values(currentAvailableDirection)
          .flat()
          .filter((el) => el.id === get.id);
        setGetSelect(currGet[0]);
      }
    }
  }, [i18n.language]);
  const handleModal = useCallback(() => {
    setShow((prevShow) => !prevShow);
    setFilter(null);
    setSearch("");
  }, [setFilter, setSearch]);

  return (
    <section>
      <SelectCard
        error={error}
        get={get}
        give={give}
        handleModal={handleModal}
        type={type}
        availableDirection={currentOptions}
        typeValute={typeValute}
      />
      <div className={clsx(styles.modal, { [styles.active]: show })}>
        {type === "give" && (
          <Modal
            options={currentOptions}
            handleModal={handleModal}
            type={type}
            filter={filter}
            show={show}
          />
        )}
        {type === "get" && (
          <Modal
            options={currentAvailableDirection}
            handleModal={handleModal}
            type={type}
            filter={filter}
            show={show}
          />
        )}
      </div>
    </section>
  );
});
