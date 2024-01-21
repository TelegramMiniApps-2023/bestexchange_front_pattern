import { FC, memo, useEffect } from "react";

import { queryClient } from "../../api/queryClient";
import { exchangersKey } from "../../assets/consts";
import { Options } from "../../model/Options";
import { useCashStore, useSelectsStore } from "../../store/store";
import styles from "./valuteCard.module.scss";
import { useFetchExchangers } from "../../api/api";
import { useTranslation } from "react-i18next";

interface ValuteCardProps {
  option: Options;
  handleModal: () => void;
  type: string;
}

export const ValuteCard: FC<ValuteCardProps> = memo(
  ({ option, handleModal, type }) => {
    // Zustand
    const { setGetSelect, setGiveSelect } = useSelectsStore((state) => state);
    const { i18n } = useTranslation();
    // рефетч
    const give = useSelectsStore((state) => state.giveSelect);
    const get = useSelectsStore((state) => state.getSelect);
    const city = useCashStore(
      (state) => state.location?.location.city.code_name
    );
    const { refetch } = useFetchExchangers({
      from: give?.code_name,
      to: get?.code_name,
      city,
    });
    useEffect(() => {
      if (type === "give") {
        setGiveSelect(option);
      } else {
        setGetSelect(option);
      }
    }, [i18n.language]);
    const handleChangeDirection = async () => {
      handleModal();
      if (type === "give") {
        setGiveSelect(option);
        setGetSelect(null);
        queryClient.removeQueries(exchangersKey);
      } else {
        await setGetSelect(option);
        await refetch();
      }
    };

    return (
      <li className={styles.valute} onClick={() => handleChangeDirection()}>
        <header>
          <div>
            <img src={option.icon_url} alt={`Иконка ${option.name}`} />
          </div>
          <h3>
            {option.name}
            <span className={styles.code}>
              {option.code_name.toUpperCase()}
            </span>
          </h3>
        </header>
      </li>
    );
  }
);
