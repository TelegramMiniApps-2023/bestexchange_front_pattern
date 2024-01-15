import { memo } from "react";
import { Exchanger } from "../../model/Exchanger";
import { ExchangersList } from "../exchangersList";
import { Loader } from "../ui/loader";
import styles from "./exchangerLoader.module.scss";
import { useTranslation } from "react-i18next";
type ExchangerLoaderProps = {
  isLoading: boolean;
  isFetching: boolean;
  exchangers: Exchanger[] | undefined;
  error: unknown;
};
export const ExchangerLoader = memo((props: ExchangerLoaderProps) => {
  const { error, exchangers, isFetching, isLoading } = props;
  const { t } = useTranslation();
  return (
    <section className={styles.exchangers}>
      {isLoading || isFetching ? (
        <Loader />
      ) : error ? (
        <h3>{t("Список пуст... Вы можете выбрать другие параметры")}</h3>
      ) : (
        exchangers && <ExchangersList exchangers={exchangers} />
      )}
    </section>
  );
});
