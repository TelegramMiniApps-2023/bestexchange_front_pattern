import { FC, useCallback, useState } from "react";
import { Country } from "../../model";
import { CityCard } from "../cityCard/cityCard";
import styles from "./countryCard.module.scss";
import ArrowDown from "../../assets/icons/ArrowDown";
import clsx from "clsx";

interface CountryCardProps {
  country: Country;
  handleModal: () => void;
}

export const CountryCard: FC<CountryCardProps> = ({ country, handleModal }) => {
  const [showCities, setShowCities] = useState(false);
  const handleAccordion = useCallback(() => {
    setShowCities((prevShow) => !prevShow);
  }, []);

  return (
    <div className={styles.country}>
      <div
        className={clsx(styles.country__title, {
          [styles.active_country]: showCities,
        })}
        key={country.id}
        onClick={handleAccordion}
      >
        <div className={styles.country__icon}>
          <img src={country.icon_url} />
        </div>
        <p>{country.name}</p>
        <span className={styles.accordion__icon}>
          {showCities && (
            <ArrowDown color="#606060" width="25px" height="25px" />
          )}
        </span>
      </div>
      <div className={clsx(styles.accordion, { [styles.active]: showCities })}>
        {country.cities.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            country={country}
            handleModal={handleModal}
          />
        ))}
      </div>
    </div>
  );
};
