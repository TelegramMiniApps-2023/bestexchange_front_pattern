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
      <h2 className={clsx({ [styles.active_select]: give || get })}>
        {type === "give" ? t("Отдаю") : t("Получаю")}
      </h2>
      <section>
        <header
          onClick={() => {
            handleModal();
          }}
          className={clsx({
            [styles.empty]:
              (!give && type === "get") ||
              (!availableDirection && type === "give") ||
              (error && type === "get") ||
              (!location && typeValute === directionTabsValute[1].value),
            [styles.selected]:
              (type === "give" && give) || (type === "get" && get),
          })}
        >
          {
            <figure>
              {type === "give" && give ? (
                <img src={give.icon_url} alt={`Иконка ${give.name}`} />
              ) : get && !error ? (
                <img src={get.icon_url} alt={`Иконка ${get.name}`} />
              ) : (
                <img src="/img/empty_select.png" alt={`Иконка`} />
              )}
            </figure>
          }
          <h3>
            {type === "give" && give
              ? give.name
              : get && !error
              ? get.name
              : error
              ? t("Недоступно")
              : t("Выберите валюту")}
          </h3>
        </header>
      </section>
    </section>
  );
});
