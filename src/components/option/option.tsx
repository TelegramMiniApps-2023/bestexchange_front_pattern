import { FC } from "react";

import { useSelectsStore } from "../../store";
import styles from "./styles.module.scss";
import { useFetchAvailable } from "../../api/api";
import { Options } from "../../model/Options";

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

  const { refetch } = useFetchAvailable({
    base: giveSelect?.code_name,
  });
  const handleChangeDirection = () => {
    if (type === "give") {
      setGetSelect(null);
      setGiveSelect(option);
      refetch();
      // store.clearExchangers();
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
