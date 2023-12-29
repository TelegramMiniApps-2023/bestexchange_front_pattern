import { FC } from "react";
import { City, Country } from "../../model";
import styles from "./cityCard.module.scss";
import { useCashStore, useSelectsStore } from "../../store/store";

interface CityCardProps {
  city: City;
  country: Country;
  handleModal: () => void;
}

export const CityCard: FC<CityCardProps> = ({ city, country, handleModal }) => {
  const { setLocation } = useCashStore((state) => state);
  // clear selects
  const { setGiveSelect, setGetSelect } = useSelectsStore((state) => state);

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
    <div className={styles.city} onClick={handleChangeLocation}>
      <div className={styles.city__title} key={city.id}>
        <p>{city.name}</p>
      </div>
    </div>
  );
};
