// tabs.tsx

import clsx from "clsx";
import { memo } from "react";
import styles from "./tabs.module.scss";

export type TabsItem = {
  value: string | null;
  content: string;
};

type TabsProps = {
  onTabClick: (tab: TabsItem) => void;
  tabs: TabsItem[];
  classNameTab?: string;
  classNameTabItem?: string;
  filter?: string | null;
  activeTabIndex?: number;
  offsetX?: number;
};

export const Tabs = memo((props: TabsProps) => {
  const {
    onTabClick,
    tabs,
    filter,
    classNameTab,
    classNameTabItem,
    activeTabIndex = 0,
    offsetX = 0,
  } = props;

  return (
    <div className={clsx(styles.tabs, classNameTab)}>
      {tabs.map((tab) => (
        <div
          style={{ transform: `translateX(${offsetX}px)` }}
          className={clsx(styles.tabs__item, classNameTabItem, {
            [styles.active]: filter === tab.value,
          })}
          onClick={() => onTabClick(tab)}
          key={tab.content}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
});
