import { useFetchExchangers } from "../../api/api";
import ChangeIcon from "../../assets/icons/ChangeIcon";
import { ExchangerCard } from "../exchangerCard";
import { Loader } from "../loader";
import { Select } from "../select";
import styles from "./styles.module.scss";

export const Main = () => {
  const {
    data: exchangers,
    refetch,
    isLoading,
  } = useFetchExchangers({ from: "", to: "" });

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
          <div className={styles.exchangers__btn} onClick={() => refetch()}>
            Далее
          </div>

          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Loader />
            </div>
          ) : (
            exchangers && (
              <div className={styles.exchangers__body}>
                <div className={styles.exchangers__title}>
                  Лучшие курсы {"give?.name"} на {"get?.name"}
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
};
