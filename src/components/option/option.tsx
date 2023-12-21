import { FC } from "react";

import { queryClient } from "../../api/queryClient";
import { exchangersKey } from "../../assets/consts";
import { Options } from "../../model/Options";
import { useSelectsStore } from "../../store/store";
import styles from "./styles.module.scss";

interface OptionProps {
  option: Options;
  handleModal: () => void;
  type: string;
}

export const Option: FC<OptionProps> = ({ option, handleModal, type }) => {
  // Zustand
  const { setGetSelect, setGiveSelect } = useSelectsStore((state) => state);

  const handleChangeDirection = () => {
    if (type === "give") {
      setGiveSelect(option);
      setGetSelect(null);
      queryClient.removeQueries(exchangersKey);
      // refetch();
    } else {
      setGetSelect(option);
    }
    handleModal();
  };

  return (
    <div className={styles.option} onClick={() => handleChangeDirection()}>
      <div className={styles.option__img}>
        <img src={option.icon_url} alt="icon" />
      </div>
      <div className={styles.option__body}>
        <div className={styles.option__name}>{option.name}</div>
        <div className={styles.option__code}>{option.code_name}</div>
      </div>
    </div>
  );
};
