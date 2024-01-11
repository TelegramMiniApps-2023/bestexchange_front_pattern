import { FC, useCallback, useState } from "react";
import clsx from "clsx";
import { ModalCountries } from "../modalCountries/modalCountries";
import styles from "./locationSelect.module.scss";
import {
  useCashStore,
  useDirectionTabsStore,
  useFiltersStore,
} from "../../store/store";
import { useFetchCashCountries } from "../../api/api";
import { directionTabsValute } from "../../assets/consts";
import SearchIcon from "../../assets/icons/SearchIcon";

interface LocationSelectProps {}

export const LocationSelect: FC<LocationSelectProps> = () => {
  const [show, setShow] = useState(false);
  const handleModal = useCallback(() => {
    setShow((prevShow) => !prevShow);
  }, []);

  const { location } = useCashStore((state) => state);
  const setSearch = useFiltersStore((state) => state.setSearch);

  const { data: countries } = useFetchCashCountries();
  const typeValute = useDirectionTabsStore((state) => state.typeValute);

  const handleShowModal = () => {
    handleModal();
    setSearch("");
  };

  return (
    <div
      className={clsx(styles.location, {
        [styles.location__active]: typeValute === directionTabsValute[1].value,
      })}
    >
      <div className={styles.location__body}>
        <div className={styles.location__title} onClick={handleShowModal}>
          <div className={styles.location__icon}>
            {location?.location ? (
              <img src={location?.location.country.icon_url} />
            ) : (
              <SearchIcon width="30px" height="30px" fill="#fff" />
            )}
          </div>
          <p>
            {location
              ? `${location.location.country.name}, ${location.location.city.name}`
              : "Выберите страну и город"}
          </p>
        </div>
        <div className={clsx(styles.modal, { [styles.active]: show })}>
          {countries && (
            <ModalCountries show={show} countries={countries} handleModal={handleModal}/>
          )}
        </div>
      </div>
    </div>
  );
};
