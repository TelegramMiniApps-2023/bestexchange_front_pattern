import { FC, useCallback, useState } from "react";
import { Country } from "../../model";
import clsx from "clsx";
import { ModalCountries } from "../modalCountries/modalCountries";
import styles from "./locationSelect.module.scss";

interface LocationSelectProps {
  countries: Country[];
  typeValute: string;
}

export const LocationSelect: FC<LocationSelectProps> = ({
  countries,
  typeValute,
}) => {
  const [show, setShow] = useState(false);
  const handleModal = useCallback(() => {
    setShow((prevShow) => !prevShow);
  }, []);
  return (
    <div className={styles.location}>
      <div
        className={styles.location__title}
        onClick={() => {
          handleModal();
        }}
      >
        <span>icon</span>Выберите страну и город
      </div>
      <div className={clsx(styles.modal, { [styles.active]: show })}>
        <ModalCountries countries={countries} handleModal={handleModal} />
      </div>
    </div>
  );
};
