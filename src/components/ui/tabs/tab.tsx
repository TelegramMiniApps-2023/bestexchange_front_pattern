import clsx from "clsx";
import { type TabsItem } from "./tabs";
import styles from "./tabs.module.scss";
import { forwardRef, memo } from "react";

type TabsItemProps = {
  tab: TabsItem;
  classNameTabItem?: string;
  onTabClick: (tab: TabsItem) => void;
  filter?: string | null;
  ref?: HTMLDivElement;
  offsetX?: number;
};
export const Tab = memo(
  forwardRef((props: TabsItemProps) => {
    const { classNameTabItem, onTabClick, tab, filter, offsetX } = props;
    return (
      <div
        style={{ transform: `translateX(${offsetX}px)` }}
        className={clsx(classNameTabItem, {
          [styles.active]: filter === tab.value,
        })}
        onClick={() => onTabClick(tab)}
        key={tab.content}
      >
        {tab.content}
      </div>
    );
  })
);
