import { FC, memo } from "react";

import { queryClient } from "../../api/queryClient";
import { exchangersKey } from "../../assets/consts";
import { Options } from "../../model/Options";
import { useCashStore, useSelectsStore } from "../../store/store";
import styles from "./valuteCard.module.scss";
import { useFetchExchangers } from "../../api/api";

interface ValuteCardProps {
  option: Options;
  handleModal: () => void;
  type: string;
}

export const ValuteCard: FC<ValuteCardProps> = memo(
  ({ option, handleModal, type }) => {
    // Zustand
    const { setGetSelect, setGiveSelect } = useSelectsStore((state) => state);

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

    const handleChangeDirection = async () => {
      handleModal();
      if (type === "give") {
        setGiveSelect(option);
        setGetSelect(null);
        queryClient.removeQueries(exchangersKey);
      } else {
        await setGetSelect(option);
        await refetch();
        // if (get) {
        //   await refetch();
        // }
      }
    };

    return (
      // <div className={styles.option} onClick={() => handleChangeDirection()}>
      //   <div className={styles.option__img}>
      //     <img src={option.icon_url} alt="icon" />
      //   </div>
      //   <div className={styles.option__body}>
      //     <div className={styles.option__name}>{option.name}</div>
      //     <div className={styles.option__code}>{option.code_name}</div>
      //   </div>
      // </div>

      <li className={styles.valute} onClick={() => handleChangeDirection()}>
        <div>
          <img src={option.icon_url} alt="icon" />
        </div>
        <section>
          <h3>{option.name}</h3>
          <p>{option.code_name}</p>
        </section>
      </li>
    );
  }
);
