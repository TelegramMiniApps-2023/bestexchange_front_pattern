import { FC } from "react";
import { Popup } from "../ui/popup";
import { Country } from "../../model";
import { CountryCard } from "../countryCard";
import styles from "./modalCountries.module.scss";
import { SearchInput } from "../optionSearch/optionSearch";
import { useFiltersStore } from "../../store/store";

interface ModalCountriesProps {
  handleModal: () => void;
  countries: Country[];
}

export const ModalCountries: FC<ModalCountriesProps> = ({
  countries,
  handleModal,
}) => {
  // cities search
  // const search = useFiltersStore((state) => state.search);
  // const filteredOptions = countries
  //   .map((country) => ({
  //     ...country,
  //     cities: country.cities.filter((city) =>
  //       city.name.toLowerCase().includes(search.toLowerCase())
  //     ),
  //   }))
  //   .filter((country) => country.cities.length > 0);

  // countries and cities search
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

  return (
    <Popup closeModal={handleModal}>
      <div className={styles.title}>Выбор страны и города</div>
      <SearchInput />
      {filteredOptions.length > 0 ? (
        <div className={styles.countries}>
          {filteredOptions.map(
            (country) =>
              country && (
                <CountryCard
                  key={country.id}
                  country={country}
                  handleModal={handleModal}
                />
              )
          )}
        </div>
      ) : (
        <div>Ничего не найдено...</div>
      )}
    </Popup>
  );
};
