import { FC } from "react";
import { Exchanger } from "../../model/Exchanger";
import styles from "./styles.module.scss";
import ArrowRight from "../../assets/icons/ArrowRight";

interface ExchangerCardProps {
  card: Exchanger;
}

export const ExchangerCard: FC<ExchangerCardProps> = ({ card }) => {
  return (
    <a href={card.partner_link} target="_blank" rel="noopener noreferrer">
      <div className={styles.card}>
        <div className={styles.card__body}>
          <div className={styles.card__name}>{card.name}</div>
          <div className={styles.card__info}>
            <div className={styles.valute}>
              <div className={styles.valute__img}>
                <img src={card.icon_valute_from} alt="logo" />
              </div>
              <p className={styles.valute__name}>{card.valute_from}</p>
            </div>
            <div className={styles.card__arrow}>
              <ArrowRight width="25px" height="25px" />
            </div>
            <div className={styles.valute}>
              <div className={styles.valute__img}>
                <img src={card.icon_valute_to} alt="logo" />
              </div>
              <p className={styles.valute__name}>{card.valute_to}</p>
            </div>
          </div>
          <div className={styles.range}>
            <div className={styles.range__count}>
              от {card.min_amount} до {card.max_amount}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
