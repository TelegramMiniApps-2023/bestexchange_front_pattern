import clsx from "clsx";
import { Options } from "../../model/Options";
import styles from "./selectCard.module.scss";
import { memo } from "react";
import { Categories } from "../../model/Categories";
import { directionTabsValute } from "../../assets/consts";
import { useCashStore } from "../../store/store";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <section className={styles.select}>
      <h2>{type === "give" ? t("Отдаю") : t("Получаю")}</h2>
      <button
        className={clsx({
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
        <p>
          {type === "give" && give
            ? give.name
            : get && !error
            ? get.name
            : error
            ? t("Направление недоступно")
            : t("Выберите валюту")}
        </p>
      </button>
    </section>
  );
});
