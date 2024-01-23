import { FC } from "react";
import { Exchanger } from "../../model/Exchanger";
import styles from "./exchangerCard.module.scss";
import ArrowRight from "../../assets/icons/ArrowRight";
import { useTranslation } from "react-i18next";
import { Location } from "../../store/store";

interface ExchangerCardProps {
  card: Exchanger;
  location: Location | null;
}

export const ExchangerCard: FC<ExchangerCardProps> = ({ card, location }) => {
  const { t, i18n } = useTranslation();
  const currentCityName =
    i18n.language === "ru"
      ? location?.location.city.name.ru
      : location?.location.city.name.en;

  return (
    <article className={styles.exchangerItem}>
      <a href={card.partner_link} target="_blank" rel="noopener noreferrer">
        <header>
          <hgroup>
            <h2>{i18n.language === "ru" ? card.name.ru : card.name.en}</h2>
            <h3>
              {location ? `${t("В г.")} ${currentCityName}` : t("Онлайн обмен")}
            </h3>
          </hgroup>
        </header>
        <hr />
        <footer>
          {/* <hgroup>
            <h2>
              {card.in_count}
              <span>{card.valute_from}</span>
              <i>
                <ArrowRight />
              </i>
            </h2>
            <h2>
              {card.out_count}
              <span>{card.valute_to}</span>
            </h2>
          </hgroup> */}
          <hgroup>
            <h2>
              <span>{card.in_count}</span>
              <div>
                <img
                  src={card.icon_valute_from}
                  alt={`Иконка ${card.valute_from}`}
                />
              </div>
              <i>
                <ArrowRight />
              </i>
            </h2>
            <h2>
              <span>{card.out_count}</span>
              <div>
                <img
                  src={card.icon_valute_to}
                  alt={`Иконка ${card.valute_to}`}
                />
              </div>
            </h2>
          </hgroup>
          <span>
            {t("Обмен")} {card.min_amount} {t("до")} {card.max_amount}
          </span>
        </footer>
      </a>
    </article>
  );
};
