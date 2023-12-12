import { FC } from "react";
import { ICategories } from "../../model/ICategories";
import styles from "./styles.module.css";
import CloseModal from "../../assets/icons/CloseModal";
import { Option } from "../option";
import { OptionFilter } from "../optionFilter";
import { SearchInput } from "../optionSearch";

interface ModalProps {
  options?: ICategories;
  handleModal: () => void;
  type: string;
}

export const Modal: FC<ModalProps> = ({ options, handleModal, type }) => {
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
            {Object.keys(options).map((category) =>
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
};
