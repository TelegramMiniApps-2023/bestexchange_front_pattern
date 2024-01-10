import { FC } from "react";
import { Country } from "../../model";
import { CityCard } from "../cityCard/cityCard";
import styles from "./countryCard.module.scss";
import ArrowDown from "../../assets/icons/ArrowDown";
import clsx from "clsx";

interface CountryCardProps {
  country: Country;
  handleModal: () => void;
  accordion: boolean;
  setAccordion: (id: number) => void;
}

export const CountryCard: FC<CountryCardProps> = ({ country, handleModal, accordion, setAccordion  }) => {
  return (
    <div className={styles.country}>
      <div
        className={clsx(styles.country__title, {
          [styles.active_country]: accordion,
        })}
        key={country.id}
        onClick={()=>setAccordion(country.id)}
      >
        <div className={styles.country__icon}>
          <img src={country.icon_url} />
        </div>
        <p>{country.name}</p>
        <span className={styles.accordion__icon}>
          {accordion && (
            <ArrowDown color="#606060" width="25px" height="25px" />
          )}
        </span>
      </div>
      <div className={clsx(styles.accordion, { [styles.active]: accordion })}>
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
