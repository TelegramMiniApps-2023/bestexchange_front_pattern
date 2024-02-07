import clsx from "clsx";
import { Options } from "../../model/Options";
import styles from "./selectCard.module.scss";
import { memo } from "react";
import { Categories } from "../../model/Categories";
import { directionTabsValute } from "../../assets/consts";
import { useCashStore, useSelectsStore } from "../../store/store";
import { useTranslation } from "react-i18next";
import { SelectSkeleton } from "../ui/selectSkeleton";
import { animated, useSpring } from "react-spring";
import { AxiosError } from "axios";

type SelectCardProps = {
  type: "give" | "get";
  handleModal: () => void;
  give: Options | null;
  get: Options | null;
  error: AxiosError;
  availableDirection?: Categories;
  typeValute: string;
  isLoading: boolean;
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
    isLoading,
  } = props;
  const { location } = useCashStore((state) => state);
  const { t } = useTranslation();
  const exchangersError = useSelectsStore(state=> state?.exchangersError)
 

  
  return (
    <section className={styles.select}>
      <h2 className={clsx(styles.selectHeader,{ [styles.active_select]: give || get })}>
        {type === "give" ? t("Отдаю") : t("Получаю")}
      </h2>
      {type === "give" && !give && isLoading ? (
        <SelectSkeleton />
      ) : (
        <section className={clsx(styles.section,{[styles.onError]: exchangersError && type==='get'})} >
          <header
            onClick={() => {
              handleModal();
            }}
            className={clsx(styles.header,{
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
              <figure className={styles.selectImage}>
                {type === "give" && give ? (
                  <img src={give.icon_url} alt={`Иконка ${give.name}`} />
                ) : get && !error ? (
                  <img src={get.icon_url} alt={`Иконка ${get.name}`} />
                ) : (
                  <img src="/img/empty_select.png" alt={`Иконка`} />
                )}
              </figure>
            }
            <h3 className={styles.valuteName}>
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
      )}
    </section>
  );
});
