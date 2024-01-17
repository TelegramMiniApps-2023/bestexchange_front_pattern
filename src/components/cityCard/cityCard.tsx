import { FC } from "react";
import { City, Country } from "../../model";
import styles from "./cityCard.module.scss";
import { useCashStore, useSelectsStore } from "../../store/store";
import { useTranslation } from "react-i18next";

interface CityCardProps {
  city: City;
  country: Country;
  handleModal: () => void;
}

export const CityCard: FC<CityCardProps> = ({ city, country, handleModal }) => {
  const { setLocation } = useCashStore((state) => state);
  // clear selects
  const { setGiveSelect, setGetSelect } = useSelectsStore((state) => state);
  const { i18n } = useTranslation();
  const handleChangeLocation = () => {
    handleModal();
    const newLocation = {
      location: {
        country: country,
        city: city,
      },
    };
    setGiveSelect(null);
    setGetSelect(null);
    setLocation(newLocation);
  };

  return (
    <li className={styles.city} onClick={handleChangeLocation}>
      <h3>{i18n.language === "ru" ? city.name.ru : city.name.en}</h3>
    </li>
  );
};
