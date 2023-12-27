import { FC, memo, useEffect } from "react";
import { Categories } from "../../model/Categories";
import { useFiltersStore } from "../../store/store";
import { Tabs } from "../ui/tabs";
import { TabsItem } from "../ui/tabs/tabs";
import styles from "./styles.module.scss";

interface OptionFilterProps {
  categories: Categories;
}

export const OptionFilter: FC<OptionFilterProps> = memo(({ categories }) => {
  const filter = useFiltersStore((state) => state.filter);
  const setFilter = useFiltersStore((state) => state.setFilter);
  const search = useFiltersStore((state) => state.search);

  const handleCategory = (category: string | null) => {
    setFilter(category);
  };

  // Фильтрация категорий на основе поисковой строки
  const filteredCategories = Object.keys(categories).filter((category) =>
    categories[category]?.some((option) =>
      option.name.toLowerCase().includes(search.toLowerCase())
    )
  );
  const tabsItem: TabsItem[] = filteredCategories.map((category) => ({
    value: category,
    content: category,
  }));

  console.log(filteredCategories);
  useEffect(() => {
    setFilter(null);
  }, [search, setFilter]);

  return (
    <div className={styles.filter}>
      {filteredCategories.length > 0 && (
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
      )}
      <Tabs
        onTabClick={(tab) => handleCategory(tab.content)}
        tabs={tabsItem}
        className={styles.filter}
        filter={filter}
      />
    </div>
  );
});
