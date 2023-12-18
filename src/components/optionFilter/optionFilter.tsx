import { FC } from "react";
import { useFiltersStore } from "../../store/store";
import styles from "./styles.module.scss";
import { Categories } from "../../model/Categories";

interface OptionFilterProps {
  categories: Categories;
}

export const OptionFilter: FC<OptionFilterProps> = ({ categories }) => {
  const filter = useFiltersStore((state) => state.filter);
  const setFilter = useFiltersStore((state) => state.setFilter);
  const search = useFiltersStore((state) => state.search);

  const handleCategory = (category: string | null) => {
    setFilter(category);
  };

  // Фильтрация категорий на основе поисковой строки
  const filteredCategories = Object.keys(categories).filter(
    (category) =>
      category.toLowerCase().includes(search.toLowerCase()) ||
      categories[category]?.some((option) =>
        option.name.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className={styles.filter}>
      <div
        className={
          !filter
            ? `${styles.filter__item} ${styles.active}`
            : styles.filter__item
        }
        onClick={() => handleCategory(null)}
      >
        Все
      </div>
      {filteredCategories.map((category, index) => (
        <div
          onClick={() => handleCategory(category)}
          key={index}
          className={
            category === filter
              ? `${styles.filter__item} ${styles.active}`
              : styles.filter__item
          }
        >
          {category}
        </div>
      ))}
    </div>
  );
};
