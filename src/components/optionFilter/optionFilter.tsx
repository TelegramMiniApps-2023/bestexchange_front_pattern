import clsx from "clsx";
import Carousel from "nuka-carousel";
import { FC, memo, useEffect, useMemo } from "react";
import { IconLeft } from "../../assets/icons/IconLeft";
import IconRight from "../../assets/icons/IconRight";
import { Categories } from "../../model/Categories";
import { useFiltersStore } from "../../store/store";
import { TabsItem } from "../ui/tabs/tabs";
import styles from "./optionFilter.module.scss";
import { Tab } from "../ui/tabs/tab";
interface OptionFilterProps {
  categories: Categories;
}

export const OptionFilter: FC<OptionFilterProps> = memo(({ categories }) => {
  const filter = useFiltersStore((state) => state.filter);
  const setFilter = useFiltersStore((state) => state.setFilter);
  const search = useFiltersStore((state) => state.search);
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
  };

  useEffect(() => {
    setFilter(null);
  }, [search, setFilter]);

  return (
    <Carousel
      enableKeyboardControls={true}
      slidesToScroll={1}
      renderCenterLeftControls={({ previousSlide, previousDisabled }) => (
        <IconLeft
          className={clsx(styles.nextTab, {
            [styles.nextTabDisabled]: previousDisabled,
          })}
          onClick={previousSlide}
        />
      )}
      renderCenterRightControls={({ nextSlide, nextDisabled }) => (
        <IconRight
          onClick={nextSlide}
          className={clsx(styles.nextTab, {
            [styles.nextTabDisabled]: nextDisabled,
          })}
        />
      )}
      className={styles.filter}
      tabbed={false}
      slidesToShow={2}
    >
      {tabsItem.map((tab) => (
        <Tab
          onTabClick={(tab) => handleCategory(tab.value)}
          classNameTabItem={styles.filter_tab_item}
          tab={tab}
          filter={filter}
          key={tab.content}
        />
      ))}
    </Carousel>
  );
});
