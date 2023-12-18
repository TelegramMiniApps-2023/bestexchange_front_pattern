import { FC, memo } from "react";

import { useSelectsStore } from "../../store/store";
import styles from "./styles.module.scss";
import { useFetchAvailable } from "../../api/api";
import { Options } from "../../model/Options";
import { queryClient } from "../../api/queryClient";
import { availableKey, exchangersKey } from "../../assets/consts";

interface OptionProps {
  option: Options;
  handleModal: () => void;
  type: string;
}

export const Option: FC<OptionProps> = ({ option, handleModal, type }) => {
  // Zustand
  const { giveSelect, setGetSelect, setGiveSelect } = useSelectsStore(
    (state) => state
  );

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
  // const { refetch } = useFetchAvailable({
  //   base: giveSelect?.code_name,
  // });
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
