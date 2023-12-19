import { memo, useEffect } from "react";
import { useFetchAvailable, useFetchExchangers } from "../../api/api";
import ChangeIcon from "../../assets/icons/ChangeIcon";
import { useSelectsStore } from "../../store/store";
import { ExchangersList } from "../exchangersList/exchangersList";
import { Loader } from "../loader/loader";
import { Select } from "../select/select";
import styles from "./styles.module.scss";

export const Main = memo(() => {
  //Zustand
  const { refetch: refetchAvailable } = useFetchAvailable({ base: "all" });
  useEffect(() => {
    refetchAvailable();
  }, [refetchAvailable]);
  const give = useSelectsStore((state) => state.giveSelect);
  const get = useSelectsStore((state) => state.getSelect);
  const switchOptions = useSelectsStore((state) => state.switchOptions);
  const handleSwitch = async () => {
    await switchOptions();
    await refetch();
  };
  const {
    data: exchangers,
    isLoading,
    refetch,
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
          <div className={styles.select}>
            <Select type="give" />
          </div>
          <div className={styles.selects__icon}>
            <ChangeIcon
              width="30px"
              height="30px"
              fill="#fff"
              onClick={() => {
                get && give && handleSwitch();
              }}
            />
          </div>
          <div className={styles.select}>
            <Select type="get" />
          </div>
        </div>
        <div className={styles.exchangers}>
          {get && give && !exchangers && !isLoading && (
            <div className={styles.exchangers__btn} onClick={() => refetch()}>
              Далее
            </div>
          )}
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Loader />
            </div>
          ) : (
            exchangers && <ExchangersList exchangers={exchangers} />
          )}
        </div>
      </div>
    </div>
  );
});
