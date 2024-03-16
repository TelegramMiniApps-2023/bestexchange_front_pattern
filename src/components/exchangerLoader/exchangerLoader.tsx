import { memo } from "react";
import { Exchanger } from "../../model/Exchanger";
import { ExchangersList } from "../exchangersList";
import styles from "./exchangerLoader.module.scss";
import { SystemError } from "../ui/systemError";
import { Preloader } from "../ui/preloader";

type ExchangerLoaderProps = {
  isLoading: boolean;
  isFetching: boolean;
  exchangers: Exchanger[] | undefined;
  error: unknown;
  preloader: boolean;
};
export const ExchangerLoader = memo((props: ExchangerLoaderProps) => {
  const { error, exchangers, isFetching, isLoading, preloader } = props;

  return (
    <section className={styles.exchangers}>
      {preloader ? (
        <div className={styles.preloaderWrapper}>
          <Preloader
            className={styles.preloader}
            progress={0}
            strokeWidth={20}
            step={30}
          />
        </div>
      ) : error ? (
        <div>
          <SystemError direction={true} />
        </div>
      ) : (
        exchangers && <ExchangersList exchangers={exchangers} />
      )}
    </section>
  );
});
