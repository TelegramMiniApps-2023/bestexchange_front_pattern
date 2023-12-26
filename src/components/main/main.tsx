import { memo, useEffect } from "react";
import { useFetchAvailable, useFetchExchangers } from "../../api/api";
import { useSelectsStore } from "../../store/store";
import { ExchangersList } from "../exchangersList/exchangersList";
import { Loader } from "../loader/loader";
import { Select } from "../select/select";
import styles from "./styles.module.scss";
import { Switcher } from "../switcher/switcher";
import { DirectionTabs } from "../directionTabs";

export const Main = memo(() => {
  // const { refetch: refetchAvailable } = useFetchAvailable({ base: "all" });
  // useEffect(() => {
  //   refetchAvailable();
  // }, [refetchAvailable]);

  const give = useSelectsStore((state) => state.giveSelect);
  const get = useSelectsStore((state) => state.getSelect);

  const {
    data: exchangers,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useFetchExchangers({
    from: give?.code_name,
    to: get?.code_name,
  });

  // временно

  return (
    <div className={styles.main}>
      <DirectionTabs />
      <div className={styles.main__body}>
        <div className={styles.selects}>
          <Select type="give" />
          <Switcher give={give} get={get} refetch={refetch} />
          <Select type="get" />
        </div>
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
      </div>
    </div>
  );
});
