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
import { MockCircle } from "../../assets/icons/mockCircle";
import { useTranslation } from "react-i18next";

interface LocationSelectProps {}

export const LocationSelect: FC<LocationSelectProps> = () => {
  const [show, setShow] = useState(false);
  const handleModal = useCallback(() => {
    setShow((prevShow) => !prevShow);
  }, []);

  const { location } = useCashStore((state) => state);
  const setSearch = useFiltersStore((state) => state.setSearch);
  const { t, i18n } = useTranslation();
  const { data: countries } = useFetchCashCountries();
  const typeValute = useDirectionTabsStore((state) => state.typeValute);

  const handleShowModal = () => {
    handleModal();
    setSearch("");
  };

  return (
    <section
      className={clsx(styles.location, {
        [styles.location__active]: typeValute === directionTabsValute[1].value,
      })}
    >
      <figure onClick={handleShowModal}>
        <div>
          {location?.location ? (
            <img src={location?.location.country.icon_url} />
          ) : (
            <span></span>
            // <MockCircle /> надо пофиксить потом
          )}
        </div>
        <figcaption>
          {location
            ? `${
                i18n.language === "ru"
                  ? location.location.country.name.ru
                  : location.location.country.name.en
              }, ${
                i18n.language === "ru"
                  ? location.location.city.name.ru
                  : location.location.city.name.en
              }`
            : t("Выберите страну и город")}
        </figcaption>
      </figure>
      <div className={clsx(styles.modal, { [styles.active]: show })}>
        {countries && (
          <ModalCountries
            show={show}
            countries={countries}
            handleModal={handleModal}
          />
        )}
      </div>
    </section>
  );
};
