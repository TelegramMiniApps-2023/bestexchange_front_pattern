import { FC } from "react";
import { Options } from "../../model/Options";
import { useSelectsStore } from "../../store/store";
import ChangeIcon from "../../assets/icons/ChangeIcon";
import styles from "./switcher.module.scss";
import clsx from "clsx";

interface SwitcherProps {
  refetch: () => void;
  give: Options | null;
  get: Options | null;
}

export const Switcher: FC<SwitcherProps> = ({ refetch, give, get }) => {
  const switchOptions = useSelectsStore((state) => state.switchOptions);
  const handleSwitch = async () => {
    await switchOptions();
    await refetch();
  };
  return (
    <i
      className={clsx(styles.switcher__icon, {
        [styles.active]: get,
      })}
    >
      <span
        className={styles.icon}
        onClick={() => {
          get && give && handleSwitch();
        }}
      >
        <ChangeIcon width="30px" height="30px" fill={"#111111"} />
      </span>
    </i>
  );
};
