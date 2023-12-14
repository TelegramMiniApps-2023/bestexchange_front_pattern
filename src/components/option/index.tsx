import { FC, useContext } from "react";
import { IOption } from "../../model/IOption";
import styles from "./styles.module.scss";
import { Context } from "../../main";
import { useSelectsStore } from "../../store";

interface OptionProps {
  option: IOption;
  handleModal: () => void;
  type: string;
}

export const Option: FC<OptionProps> = ({ option, handleModal, type }) => {
  const { store } = useContext(Context);

  // Zustand
  const setGive = useSelectsStore((state) => state.setGiveSelect);
  const setGet = useSelectsStore((state) => state.setGetSelect);
  return (
    <div
      className={styles.option}
      onClick={() => {
        if (type === "give") {
          setGet(null);
          setGive(option);
          store.setAvailable();
          store.clearExchangers();
        } else {
          setGet(option);
        }
        handleModal();
      }}
    >
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
