import { FC } from "react";
import { Country } from "../../model";
import { CityCard } from "../cityCard/cityCard";
import styles from "./countryCard.module.scss";
import ArrowDown from "../../assets/icons/ArrowDown";

interface CountryCardProps {
  country: Country;
  handleModal: () => void;
}

export const CountryCard: FC<CountryCardProps> = ({ country, handleModal }) => {
  return (
    <div className={styles.country}>
      <div className={styles.country__title} key={country.id}>
        <p>{country.name}</p>
        <span>
          <ArrowDown color="#606060" width="25px" height="25px" />
        </span>
      </div>
      <div>
        {country.cities.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            country={country.name}
            handleModal={handleModal}
          />
        ))}
      </div>
    </div>
  );
};
