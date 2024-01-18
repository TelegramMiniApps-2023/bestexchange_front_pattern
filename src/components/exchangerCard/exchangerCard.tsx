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
        <hgroup>
          <h2>
            {card.in_count} <span>{card.valute_from}</span>
            <i>
              <ArrowRight />
            </i>
          </h2>
          <h2>
            {card.out_count} <span>{card.valute_to}</span>
          </h2>
        </hgroup>
        <span>
          {t("Обмен")} {card.min_amount} {t("до")} {card.max_amount}
        </span>
      </footer>
    </article>
  );
};
