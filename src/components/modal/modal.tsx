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
  return (
    <Popup closeModal={handleModal}>
      {options && Object.keys(options).length > 0 ? (
        <div className={styles.modal__body}>
          <SearchInput type={type} />
          <div className={styles.modal__filter}>
            <OptionFilter categories={options} />
          </div>
          <div className={styles.modal__options}>
            {filter
              ? options[filter]
                  ?.filter((option) =>
                    option.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((option) => (
                    <Option
                      key={option.code_name}
                      option={option}
                      handleModal={handleModal}
                      type={type}
                    />
                  ))
              : Object.keys(options).map((category) =>
                  options[category]
                    ?.filter((option) =>
                      option.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((option) => (
                      <Option
                        key={option.code_name}
                        option={option}
                        handleModal={handleModal}
                        type={type}
                      />
                    ))
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
