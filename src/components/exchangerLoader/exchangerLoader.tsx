import { memo } from "react";
import { Exchanger } from "../../model/Exchanger";
import { ExchangersList } from "../exchangersList";
import { Loader } from "../ui/loader/loader";
import styles from "./exchangerLoader.module.scss";
type ExchangerLoaderProps = {
  isLoading: boolean;
  isFetching: boolean;
  exchangers: Exchanger[] | undefined;
  error: unknown;
};
export const ExchangerLoader = memo((props: ExchangerLoaderProps) => {
  const { error, exchangers, isFetching, isLoading } = props;
  return (
    <section className={styles.exchangers}>
      {isLoading || isFetching ? (
        <Loader />
      ) : error ? (
        <h3>Список пуст... Вы можете выбрать другие параметры</h3>
      ) : (
        exchangers && <ExchangersList exchangers={exchangers} />
      )}
    </section>
  );
});
