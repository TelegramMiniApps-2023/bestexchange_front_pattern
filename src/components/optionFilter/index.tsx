import { FC } from "react";
import { Categories } from "../../model/Categories";
import styles from "./styles.module.scss";

interface OptionFilterProps {
  categories: Categories;
}

export const OptionFilter: FC<OptionFilterProps> = ({ categories }) => {
  // const { store } = useContext(Context);
  const handleCategory = (category: string | null) => {
    // store.setFilter(category);
  };
  return (
    <div className={styles.filter}>
      <div
        // className={
        //   !store.filter
        //     ? `${styles.filter__item} ${styles.active}`
        //     : styles.filter__item
        // }
        onClick={() => handleCategory(null)}
      >
        Все
      </div>
      {Object.keys(categories).map((category, index) => (
        <div
          onClick={() => handleCategory(category)}
          key={index}
          // className={
          //   category === store.filter
          //     ? `${styles.filter__item} ${styles.active}`
          //     : styles.filter__item
          // }
        >
          {category}
        </div>
      ))}
    </div>
  );
};
