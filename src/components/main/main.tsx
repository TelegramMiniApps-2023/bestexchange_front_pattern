import { memo } from "react";
import { useFetchExchangers, useFetchOptions } from "../../api/api";
import ChangeIcon from "../../assets/icons/ChangeIcon";
import { useSelectsStore } from "../../store";
import { ExchangerCard } from "../exchangerCard/exchangeCard";
import { Loader } from "../loader/loader";
import { Select } from "../select/select";
import styles from "./styles.module.scss";

export const Main = memo(() => {
  //Zustand
  useFetchOptions();
  const give = useSelectsStore((state) => state.giveSelect);
  const get = useSelectsStore((state) => state.getSelect);
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
          <div
            className={styles.selects__icon}
            // onClick={() => {
            //   store.get && store.give && store.switchOptions();
            // }}
          >
            <ChangeIcon width="30px" height="30px" fill="#fff" />
          </div>
          <div className={styles.select}>
            <Select type="get" />
          </div>
        </div>
        <div className={styles.exchangers}>
          {get && give && !exchangers && (
            <div className={styles.exchangers__btn} onClick={() => refetch()}>
              Далее
            </div>
          )}
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Loader />
            </div>
          ) : (
            exchangers && (
              <div className={styles.exchangers__body}>
                <div className={styles.exchangers__title}>
                  Лучшие курсы {give?.name} на {get?.name}
                </div>
                <div className={styles.exchangers__cards}>
                  {exchangers.map((card) => (
                    <ExchangerCard key={card.id} card={card} />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
});
