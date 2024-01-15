import { FC, memo } from "react";
import { useSelectsStore } from "../../store/store";
import styles from "./exchangersList.module.scss";
import { Exchanger } from "../../model/Exchanger";
import { ExchangerCard } from "../exchangerCard";

interface ExchangersListProps {
  exchangers: Exchanger[];
}

export const ExchangersList: FC<ExchangersListProps> = memo(
  ({ exchangers }) => {
    const give = useSelectsStore((state) => state.giveSelect);
    const get = useSelectsStore((state) => state.getSelect);
    return (
      <section className={styles.exchangersList}>
        <h2>
          Лучшие курсы {give?.name} на {get?.name}
        </h2>
        <div>
          {exchangers &&
            exchangers.map((card) => (
              <ExchangerCard key={card.id} card={card} />
            ))}
        </div>
      </section>
    );
  }
);
