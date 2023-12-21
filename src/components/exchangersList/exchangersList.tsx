import { FC, memo } from "react";
import { useSelectsStore } from "../../store/store";
import styles from "./styles.module.scss";
import { Exchanger } from "../../model/Exchanger";
import { ExchangerCard } from "../exchangerCard/exchangeCard";

interface ExchangersListProps {
  exchangers: Exchanger[];
}

export const ExchangersList: FC<ExchangersListProps> = memo(
  ({ exchangers }) => {
    const give = useSelectsStore((state) => state.giveSelect);
    const get = useSelectsStore((state) => state.getSelect);
    return (
      <div className={styles.exchangers__body}>
        <div className={styles.exchangers__title}>
          Лучшие курсы {give?.name} на {get?.name}
        </div>
        <div className={styles.exchangers__cards}>
          {exchangers &&
            exchangers.map((card) => (
              <ExchangerCard key={card.id} card={card} />
            ))}
        </div>
      </div>
    );
  }
);
