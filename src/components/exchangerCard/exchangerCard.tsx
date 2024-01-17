import { FC } from "react";
import { Exchanger } from "../../model/Exchanger";
import styles from "./exchangerCard.module.scss";
import ArrowRight from "../../assets/icons/ArrowRight";
import { useTranslation } from "react-i18next";

interface ExchangerCardProps {
  card: Exchanger;
}

export const ExchangerCard: FC<ExchangerCardProps> = ({ card }) => {
  const { t } = useTranslation();
  return (
    // <a href={card.partner_link} target="_blank" rel="noopener noreferrer">
    // </a>
    <article className={styles.exchangerItem}>
      <header>
        <hgroup>
          <h2>{card.name}</h2>
          <h3>{t("Онлайн обмен")}</h3>
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
          {t("Обмен")} {card.min_amount} {t("до")} {card.max_amount}
        </span>
      </footer>
    </article>
  );
};
