import { FC, useContext } from "react";
import { IOption } from "../../model/IOption";
import styles from "./styles.module.css";
import { Context } from "../../main";

interface OptionProps {
  option: IOption;
  handleModal: () => void;
  type: string;
}

export const Option: FC<OptionProps> = ({ option, handleModal, type }) => {
  const { store } = useContext(Context);
  return (
    <div
      className={styles.option}
      onClick={() => {
        if (type === "give") {
          store.setGet(null);
          store.setGive(option);
          store.setAvailable();
          store.clearExchangers();
        } else {
          store.setGet(option);
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
