import { FC } from "react";
import { Categories } from "../../model/Categories";
import { ValuteCard } from "../valuteCard";
import { OptionFilter } from "../optionFilter";
import { OptionSearch } from "../optionSearch";
import { Popup } from "../ui/popup";
import { useFiltersStore } from "../../store/store";
import styles from "./modal.module.scss";

interface ModalProps {
  options?: Categories;
  handleModal: () => void;
  type: string;
  filter: string | null;
}

export const Modal: FC<ModalProps> = ({
  options,
  handleModal,
  type,
  filter,
}) => {
  const search = useFiltersStore((state) => state.search);
  // const setFilter = useFiltersStore((state) => state.setFilter);

  const filteredOptions = filter
    ? options?.[filter]?.filter((option) =>
        option.name.toLowerCase().includes(search.toLowerCase())
      )
    : Object.values(options || {}).flatMap((category) =>
        category.filter((option) =>
          option.name.toLowerCase().includes(search.toLowerCase())
        )
      );
  return (
    <Popup closeModal={handleModal}>
      <section className={styles.valutesPopup}>
        {options && Object.keys(options).length > 0 ? (
          <>
            <h3>{type === "give" ? "ОТДАЮ" : "ПОЛУЧАЮ"}</h3>
            <OptionFilter categories={options} />
            <OptionSearch />
            <ul>
              {filteredOptions && filteredOptions?.length > 0 ? (
                filteredOptions.map((option) => (
                  <ValuteCard
                    key={option.id}
                    option={option}
                    handleModal={handleModal}
                    type={type}
                  />
                ))
              ) : (
                <p className={styles.empty}>Нет доступных направлений</p>
              )}
            </ul>
          </>
        ) : (
          <p className={styles.empty}>
            Для данного направления на данный момент нет доступных валют
          </p>
        )}
      </section>
    </Popup>
  );
};
