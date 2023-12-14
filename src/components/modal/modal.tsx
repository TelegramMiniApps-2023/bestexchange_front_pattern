import { FC, memo } from "react";
import { Categories } from "../../model/Categories";
import styles from "./styles.module.scss";
import CloseModal from "../../assets/icons/CloseModal";

import { OptionFilter } from "../optionFilter/optionFilter";
import { SearchInput } from "../optionSearch";
import { Option } from "../option/option";

interface ModalProps {
  options?: Categories;
  handleModal: () => void;
  type: string;
  filter: string | null;
}

export const Modal: FC<ModalProps> = memo(
  ({ options, handleModal, type, filter }) => {
    return (
      <div className={styles.modal}>
        <span className={styles.modal__close}>
          <CloseModal width="20px" height="20px" onClick={handleModal} />
        </span>
        {options && Object.keys(options).length > 0 ? (
          <div className={styles.modal__body}>
            <SearchInput type={type} />
            <div className={styles.modal__filter}>
              <OptionFilter categories={options} />
            </div>
            <div className={styles.modal__options}>
              {filter
                ? options[filter]?.map((option) => (
                    <Option
                      key={option.code_name}
                      option={option}
                      handleModal={handleModal}
                      type={type}
                    />
                  ))
                : Object.keys(options).map((category) =>
                    options[category]?.map((option) => (
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
      </div>
    );
  }
);
