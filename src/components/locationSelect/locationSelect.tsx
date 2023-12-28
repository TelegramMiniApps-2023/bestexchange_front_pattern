import { FC, useCallback, useState } from "react";
import { Country } from "../../model";
import clsx from "clsx";
import { ModalCountries } from "../modalCountries/modalCountries";
import styles from "./locationSelect.module.scss";
import { useCashStore, useFiltersStore } from "../../store/store";

interface LocationSelectProps {
  countries: Country[];
  typeValute: string;
}

export const LocationSelect: FC<LocationSelectProps> = ({ countries }) => {
  const [show, setShow] = useState(false);
  const handleModal = useCallback(() => {
    setShow((prevShow) => !prevShow);
  }, []);

  const { location } = useCashStore((state) => state);
  const setSearch = useFiltersStore((state) => state.setSearch);

  return (
    <div className={styles.location}>
      <div
        className={styles.location__title}
        onClick={() => {
          handleModal();
          setSearch("");
        }}
      >
        {location
          ? `${location.location.country}, ${location.location.city.name}`
          : "Выберите страну и город"}
      </div>
      <div className={clsx(styles.modal, { [styles.active]: show })}>
        <ModalCountries countries={countries} handleModal={handleModal} />
      </div>
    </div>
  );
};
