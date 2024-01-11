import { FC, useEffect, useState } from "react";
import { Popup } from "../ui/popup";
import { Country } from "../../model";
import { CountryCard } from "../countryCard";
import styles from "./modalCountries.module.scss";
import { OptionSearch } from "../optionSearch";
import { useFiltersStore } from "../../store/store";

interface ModalCountriesProps {
  handleModal: () => void;
  countries: Country[];
  show: boolean;
}

export const ModalCountries: FC<ModalCountriesProps> = ({
  countries,
  handleModal,
  show,
}) => {
  // cities search
  const search = useFiltersStore((state) => state.search.toLowerCase());
  const filteredOptions = countries
    .map((country) => {
      const isCountryMatch = country.name.toLowerCase().includes(search);
      const filteredCountry = {
        ...country,
        cities: isCountryMatch
          ? country.cities
          : country.cities.filter((city) =>
              city.name.toLowerCase().includes(search)
            ),
      };
      if (isCountryMatch || filteredCountry.cities.length > 0) {
        return filteredCountry;
      }
      return null;
    })
    .filter((country) => country !== null);

  // accrodion logic
  const [accordionStates, setAccordionStates] = useState<{
    [key: number]: boolean;
  }>({});
  const handleAccordion = (countryId: number) => {
    setAccordionStates((prevStates) => {
      const newStates: { [key: number]: boolean } = { ...prevStates };
      Object.keys(newStates).forEach((key) => {
        const numericKey = parseInt(key, 10);
        if (!isNaN(numericKey) && numericKey !== countryId) {
          newStates[numericKey] = false;
        }
      });
      newStates[countryId] = !prevStates[countryId];
      return newStates;
    });
  };

  // clear accordions when modal closed
  useEffect(() => {
    setAccordionStates({});
  }, [show]);

  return (
    <Popup closeModal={handleModal}>
      {/* <h2 className={styles.title}>Выбор страны и города</h2>
      <OptionSearch />
      {filteredOptions.length > 0 ? (
        <ul className={styles.countries}>
          {filteredOptions.map(
            (country) =>
              country && (
                <CountryCard
                  key={country.id}
                  country={country}
                  handleModal={handleModal}
                  accordion={accordionStates[country.id] || false}
                  setAccordion={() => handleAccordion(country.id)}
                />
              )
          )}
        </ul>
      ) : (
        <p>Ничего не найдено...</p>
      )} */}
      <section className={styles.countriesPopup}>
        <h2 className={styles.title}>Выбор страны и города</h2>
        <OptionSearch />
        {filteredOptions.length > 0 ? (
          <ul className={styles.countries}>
            {filteredOptions.map(
              (country) =>
                country && (
                  <CountryCard
                    key={country.id}
                    country={country}
                    handleModal={handleModal}
                    accordion={accordionStates[country.id] || false}
                    setAccordion={() => handleAccordion(country.id)}
                  />
                )
            )}
          </ul>
        ) : (
          <p>Ничего не найдено...</p>
        )}
      </section>
    </Popup>
  );
};
