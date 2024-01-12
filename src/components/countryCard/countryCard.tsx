import { FC } from "react";
import { Country } from "../../model";
import { CityCard } from "../cityCard";
import styles from "./countryCard.module.scss";
import ArrowDown from "../../assets/icons/ArrowDown";
import clsx from "clsx";

interface CountryCardProps {
  country: Country;
  handleModal: () => void;
  accordion: boolean;
  setAccordion: (id: number) => void;
}

export const CountryCard: FC<CountryCardProps> = ({
  country,
  handleModal,
  accordion,
  setAccordion,
}) => {
  return (
    <div className={styles.country}>
      <header
        className={clsx({ [styles.active_country]: accordion })}
        onClick={() => setAccordion(country.id)}
      >
        <div>
          <img src={country.icon_url} alt={`Иконка ${country.name}`} />
        </div>
        <h3>{country.name}</h3>
        <i>
          {accordion && (
            <ArrowDown color="#606060" width="25px" height="25px" />
          )}
        </i>
      </header>
      <section className={clsx({ [styles.active]: accordion })}>
        <ul>
          {country.cities.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              country={country}
              handleModal={handleModal}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};
