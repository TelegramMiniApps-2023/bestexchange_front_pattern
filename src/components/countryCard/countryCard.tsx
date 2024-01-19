import { FC } from "react";
import { Country } from "../../model";
import { CityCard } from "../cityCard";
import styles from "./countryCard.module.scss";
import ArrowDown from "../../assets/icons/ArrowDown";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();
  return (
    <div className={styles.country}>
      <header
        className={clsx({ [styles.active_country]: accordion })}
        onClick={() => setAccordion(country.id)}
      >
        <figure>
          <img src={country.icon_url} alt={`Иконка ${country.name}`} />
        </figure>
        <h3>{i18n.language === "ru" ? country.name.ru : country.name.en}</h3>
        <i>
          {accordion && (
            <ArrowDown color="#111111" width="35px" height="35px" />
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
