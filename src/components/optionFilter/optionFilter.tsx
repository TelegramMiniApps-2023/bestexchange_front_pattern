import { FC, memo, useEffect } from "react";
import IconRight from "../../assets/icons/IconRight";
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

  const filteredCategories = Object.keys(categories).filter((category) =>
    categories[category]?.some((option) =>
      option.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  const tabsItem: TabsItem[] = [
    { value: null, content: "Все" },
    ...filteredCategories.map((category) => ({
      value: category,
      content: category,
    })),
  ];

  const handleNextTab = () => {
    const currentIndex = tabsItem.findIndex((tab) => tab.value === filter);
    const nextIndex = (currentIndex + 1) % tabsItem.length;
    console.log(nextIndex);
    setFilter(tabsItem[nextIndex].value);
  };

  useEffect(() => {
    setFilter(null);
  }, [search, setFilter]);

  return (
    <div className={styles.filterWrapper}>
      <Tabs
        onTabClick={(tab) => handleCategory(tab.value)}
        tabs={tabsItem}
        classNameTab={styles.filter}
        filter={filter}
        classNameTabItem={styles.filter_tab_item}
      />
      <IconRight className={styles.nextTab} onClick={handleNextTab} />
    </div>
  );
});
