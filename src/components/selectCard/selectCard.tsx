import clsx from "clsx";
import { Options } from "../../model/Options";
import styles from "./selectCard.module.scss";
import { memo } from "react";
import { Categories } from "../../model/Categories";

type SelectCardProps = {
  type: "give" | "get";
  handleModal: () => void;
  give: Options | null;
  get: Options | null;
  error: unknown;
  availableDirection?: Categories;
};
export const SelectCard = memo((props: SelectCardProps) => {
  const { give, handleModal, type, error, get, availableDirection } = props;
  return (
    <div className={styles.select}>
      <p className={styles.select__label}>
        {type === "give" ? "Отдаю" : "Получаю"}
      </p>
      <div
        className={clsx(styles.select__input, {
          [styles.active]:
            (!give && type === "get") ||
            (!availableDirection && type === "get"),
        })}
        onClick={() => {
          handleModal();
        }}
      >
        {type === "give" && give ? (
          give.name
        ) : get && !error ? (
          get.name
        ) : (
          <span>Выберите валюту</span>
        )}
        {/* <span className={styles.input__icon}>
                        <ArrowDown width="20px" height="20px" fill="#fff" />
                    </span> */}
      </div>
    </div>
  );
});
