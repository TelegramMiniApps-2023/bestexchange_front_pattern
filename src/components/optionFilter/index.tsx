import { FC, useContext } from "react";
import styles from "./styles.module.scss";
import { ICategories } from "../../model/ICategories";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

interface OptionFilterProps {
  categories: ICategories;
}

export const OptionFilter: FC<OptionFilterProps> = observer(
  ({ categories }) => {
    const { store } = useContext(Context);
    const handleCategory = (category: string | null) => {
      store.setFilter(category);
    };
    return (
      <div className={styles.filter}>
        <div
          className={
            !store.filter
              ? `${styles.filter__item} ${styles.active}`
              : styles.filter__item
          }
          onClick={() => handleCategory(null)}
        >
          Все
        </div>
        {Object.keys(categories).map((category, index) => (
          <div
            onClick={() => handleCategory(category)}
            key={index}
            className={
              category === store.filter
                ? `${styles.filter__item} ${styles.active}`
                : styles.filter__item
            }
          >
            {category}
          </div>
        ))}
      </div>
    );
  }
);
