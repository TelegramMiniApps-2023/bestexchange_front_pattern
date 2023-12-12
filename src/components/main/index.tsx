import { ExchangerCard } from "../exchangerCard";
import { Select } from "../select";
import styles from "./styles.module.css";
import ChangeIcon from "../../assets/icons/ChangeIcon";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Loader } from "../loader";
import { Context } from "../../main";

export const Main = observer(() => {
  const { store } = useContext(Context);
  useEffect(() => {
    store.setOptions();
  }, []);
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
            onClick={() => {
              store.get && store.give && store.switchOptions();
            }}
          >
            <ChangeIcon width="30px" height="30px" fill="#fff" />
          </div>
          <div className={styles.select}>
            <Select type="get" />
          </div>
        </div>
        <div className={styles.exchangers}>
          {store.get && store.give && !store.exchangers && (
            <div
              className={styles.exchangers__btn}
              onClick={() => store.setExchangers()}
            >
              Далее
            </div>
          )}
          {store.exchangers?.isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Loader />
            </div>
          ) : (
            store.exchangers && (
              <div className={styles.exchangers__body}>
                <div className={styles.exchangers__title}>
                  Лучшие курсы {store.give?.name} на {store.get?.name}
                </div>
                <div className={styles.exchangers__cards}>
                  {store.exchangers.data.map((card) => (
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
