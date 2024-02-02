import { FC } from "react";
import { Exchanger } from "../../model/Exchanger";
import styles from "./exchangerCard.module.scss";
import ArrowRight from "../../assets/icons/ArrowRight";
import { useTranslation } from "react-i18next";
import { Location } from "../../store/store";
import { RoundValute } from "../ui/roundValute";

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

  // telegram object
  const tg = window.Telegram.WebApp;
  const options = [{ try_instant_view: true }];
  const openLink = (url: string) => tg.openLink(url, options);

  return (
    <article className={styles.exchangerItem}>
      <a onClick={() => openLink(card.partner_link)} rel="noopener noreferrer">
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
          <hgroup>
            <h2>
              <RoundValute value={card.in_count} />
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
              <RoundValute value={card.out_count} />
              <div>
                <img
                  src={card.icon_valute_to}
                  alt={`Иконка ${card.valute_to}`}
                />
              </div>
            </h2>
          </hgroup>
          <span>
            {t("Обмен")} <RoundValute value={card.min_amount} /> {t("до")}{" "}
            <RoundValute value={card.max_amount} />
          </span>
        </footer>
      </a>
    </article>
  );
};
