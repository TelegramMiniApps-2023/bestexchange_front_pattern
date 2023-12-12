import { FC } from "react";
import styles from "./styles.module.css";
import { ICategories } from "../../model/ICategories";

interface OptionFilterProps {
  categories: ICategories;
}

export const OptionFilter: FC<OptionFilterProps> = ({ categories }) => {
  return (
    <div className={styles.filter}>
      {Object.keys(categories).map((category, index) => (
        <div key={index} className={styles.filter__item}>
          {category}
        </div>
      ))}
    </div>
  );
};
