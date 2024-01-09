import clsx from "clsx";
import { Options } from "../../model/Options";
import styles from "./selectCard.module.scss";
import { memo } from "react";
import { Categories } from "../../model/Categories";
import { directionTabsValute } from "../../assets/consts";
import { useCashStore } from "../../store/store";

type SelectCardProps = {
  type: "give" | "get";
  handleModal: () => void;
  give: Options | null;
  get: Options | null;
  error: unknown;
  availableDirection?: Categories;
  typeValute: string;
};
export const SelectCard = memo((props: SelectCardProps) => {
  const {
    give,
    handleModal,
    type,
    error,
    get,
    availableDirection,
    typeValute,
  } = props;
  const { location } = useCashStore((state) => state);
  return (
    <div className={styles.select}>
      <p className={styles.select__label}>
        {type === "give" ? "Отдаю" : "Получаю"}
      </p>
      <div
        className={clsx(styles.select__input, {
          [styles.active]:
            (!give && type === "get") ||
            (!availableDirection && type === "give") ||
            (error && type === "get") ||
            (!location && typeValute === directionTabsValute[1].value),
          [styles.selected]:
            (type === "give" && give) || (type === "get" && get),
        })}
        onClick={() => {
          handleModal();
        }}
      >
        {type === "give" && give
          ? give.name
          : get && !error
          ? get.name : error ? "Направление недоступно"
          : "Выберите валюту"}
      </div>
    </div>
  );
});
