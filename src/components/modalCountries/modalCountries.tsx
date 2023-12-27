import { FC } from "react";
import { Popup } from "../ui/popup";
import { Country } from "../../model";

interface ModalCountriesProps {
  handleModal: () => void;
  countries: Country[];
}

export const ModalCountries: FC<ModalCountriesProps> = ({
  countries,
  handleModal,
}) => {
  return (
    <Popup closeModal={handleModal}>
      {countries.map((country) => (
        <div key={country.id}>{country.name}</div>
      ))}
    </Popup>
  );
};
