import { memo } from "react";
import { useFetchExchangers } from "../../api/api";
import { useSelectsStore } from "../../store/store";
import { ExchangersList } from "../exchangersList/exchangersList";
import { Loader } from "../loader/loader";
import { Select } from "../select/select";
import { Switcher } from "../switcher/switcher";
import styles from "./styles.module.scss";

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
      <div className={styles.title}>
        <p className={styles.title__title}>Lorem ipsum dolor sit amet.</p>
        <p className={styles.title__text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nisi
          voluptates ad at molestias inventore et odio aliquid quis quidem?
        </p>
      </div>
      <div className={styles.main__body}>
        <div className={styles.selects}>
          <Select type="give" />
          <Switcher give={give} get={get} refetch={refetch} />
          <Select type="get" />
        </div>
        <div className={styles.exchangers}>
          {/* {get && give && !exchangers && !isLoading && (
            <div className={styles.exchangers__btn} onClick={() => refetch()}>
              Далее
            </div>
          )} */}
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
