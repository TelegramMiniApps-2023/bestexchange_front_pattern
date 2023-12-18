import { FC } from "react";
import { Categories } from "../../model/Categories";
import styles from "./styles.module.scss";

import { Option } from "../option/option";
import { OptionFilter } from "../optionFilter/optionFilter";
import { SearchInput } from "../optionSearch/optionSearch";
import { Popup } from "../ui/popup";
import { useFiltersStore } from "../../store/store";

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
      {options && Object.keys(options).length > 0 ? (
        <div className={styles.modal__body}>
          <SearchInput />
          <div className={styles.modal__filter}>
            <OptionFilter categories={options} />
          </div>
          <div className={styles.modal__options}>
            {filteredOptions && filteredOptions?.length > 0 ? (
              filteredOptions.map((option) => (
                <Option
                  key={option.code_name}
                  option={option}
                  handleModal={handleModal}
                  type={type}
                />
              ))
            ) : (
              <div className={styles.modal__empty}>Список пуст...</div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.modal__empty}>
          <div style={{ fontSize: "74px", marginBottom: "20px" }}>:{"("}</div>
          <div>Список пуст...</div>
        </div>
      )}
    </Popup>
  );
};
