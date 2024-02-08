import clsx from "clsx";
import { type TabsItem } from "./tabs";
import styles from "./tabs.module.scss";
import { forwardRef, memo } from "react";

type TabsItemProps = {
  tab: TabsItem;
  classNameTabItem?: string;
  onTabClick: (tab: TabsItem) => void;
  filter?: string | null;
  classNameActiveDirection?: string;
};
export const Tab = memo(
  forwardRef((props: TabsItemProps) => {
    const {
      classNameTabItem,
      classNameActiveDirection,
      onTabClick,
      tab,
      filter,
    } = props;
    return (
      <div
        className={clsx(classNameTabItem, {
          [classNameActiveDirection ? classNameActiveDirection : styles.active]:
            filter === tab.value,
        })}
        onClick={() => onTabClick(tab)}
        key={tab.content}
      >
        {tab.content}
      </div>
    );
  })
);
