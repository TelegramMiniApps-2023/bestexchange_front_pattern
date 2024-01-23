import { memo } from "react";
import { Exchanger } from "../../model/Exchanger";
import { ExchangersList } from "../exchangersList";
import { Loader } from "../ui/loader";
import styles from "./exchangerLoader.module.scss";
import { SystemError } from "../ui/systemError";
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
        <div>
          <SystemError direction={true} />
        </div>
      ) : (
        exchangers && <ExchangersList exchangers={exchangers} />
      )}
    </section>
  );
});
