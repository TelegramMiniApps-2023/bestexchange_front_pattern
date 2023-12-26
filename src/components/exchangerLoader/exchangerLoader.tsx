import { memo } from "react";
import { Exchanger } from "../../model/Exchanger";
import { ExchangersList } from "../exchangersList/exchangersList";
import { Loader } from "../loader/loader";
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
    <div className={styles.exchangers}>
      {isLoading || isFetching ? (
        <Loader />
      ) : error ? (
        <div className={styles.empty}>
          Список пуст... Вы можете выбрать другие параметры
        </div>
      ) : (
        exchangers && <ExchangersList exchangers={exchangers} />
      )}
    </div>
  );
});
