import { FC, memo, useEffect, useMemo, useState } from "react";
import IconRight from "../../assets/icons/IconRight";
import { Categories } from "../../model/Categories";
import { useFiltersStore } from "../../store/store";
import { Tabs } from "../ui/tabs";
import { TabsItem } from "../ui/tabs/tabs";
import styles from "./styles.module.scss";
import { IconLeft } from "../../assets/icons/IconLeft";

interface OptionFilterProps {
  categories: Categories;
}

export const OptionFilter: FC<OptionFilterProps> = memo(({ categories }) => {
  const filter = useFiltersStore((state) => state.filter);
  const setFilter = useFiltersStore((state) => state.setFilter);
  const search = useFiltersStore((state) => state.search);
  // const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const filteredCategories = Object.keys(categories).filter((category) =>
    categories[category]?.some((option) =>
      option.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  const tabsItem: TabsItem[] = useMemo(
    () => [
      { value: null, content: "Все" },
      ...filteredCategories.map((category) => ({
        value: category,
        content: category,
      })),
    ],
    [filteredCategories]
  );

  const handleCategory = (category: string | null) => {
    setFilter(category);
    if (tabsItem.length < 3) return;
    if (category === null) {
      setOffsetX(0);
      return;
    }

    const categoryIndex = tabsItem.findIndex((tab) => tab.value === category);
    setOffsetX(-100 * categoryIndex);
  };
  const handleNextTab = () => {
    if (tabsItem.length < 3) return;
    setOffsetX((currentOffset) => {
      const newOffset = currentOffset - 100;
      const maxOffset = -(100 * tabsItem.length - 1);
      return Math.max(newOffset, maxOffset);
    });
  };
  const handlePrevTab = () => {
    setOffsetX((currentOffset) => {
      const newOffset = currentOffset + 100;

      return Math.min(newOffset, 0);
    });
  };

  useEffect(() => {
    setFilter(null);
    setOffsetX(0);
  }, [search, setFilter]);

  return (
    <div className={styles.filterWrapper}>
      <IconLeft className={styles.nextTab} onClick={handlePrevTab} />
      <Tabs
        onTabClick={(tab) => handleCategory(tab.value)}
        tabs={tabsItem}
        classNameTab={styles.filter}
        filter={filter}
        classNameTabItem={styles.filter_tab_item}
        // activeTabIndex={activeTabIndex}
        offsetX={offsetX}
      />
      <IconRight className={styles.nextTab} onClick={handleNextTab} />
    </div>
  );
});
