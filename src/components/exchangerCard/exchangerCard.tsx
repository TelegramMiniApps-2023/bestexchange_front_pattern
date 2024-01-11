import { FC } from "react";
import { Exchanger } from "../../model/Exchanger";
import styles from "./exchangerCard.module.scss";
import ArrowRight from "../../assets/icons/ArrowRight";

interface ExchangerCardProps {
  card: Exchanger;
}

export const ExchangerCard: FC<ExchangerCardProps> = ({ card }) => {
  return (
    // <a href={card.partner_link} target="_blank" rel="noopener noreferrer">
    // </a>
    <article className={styles.exchangerItem}>
      <header>
        <hgroup>
          <h2>{card.name}</h2>
          <h3>Онлайн обмен</h3>
        </hgroup>
      </header>
      <hr />
      <footer>
        <div className={styles.exchangerRate}>
          <p>
            <mark>{card.in_count}</mark> {card.valute_from}
          </p>
          <i className={styles.arrow}>
            <ArrowRight />
          </i>
          <p>
            {card.out_count} {card.valute_to}
          </p>
        </div>
        <span>
          Обмен {card.min_amount} до {card.max_amount}
        </span>
      </footer>
    </article>
  );
};
