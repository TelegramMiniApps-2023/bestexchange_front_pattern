// export type TabsItem = {
//   value: string;

import clsx from "clsx";
import styles from "./tabs.module.scss";
import { memo } from "react";
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
};
export const Tabs = memo((props: TabsProps) => {
  const { onTabClick, tabs, filter, classNameTab, classNameTabItem } = props;

  return (
    <div className={clsx(styles.tabs, classNameTab)}>
      {tabs.map((tab) => (
        <div
          className={clsx(styles.tabs__item, classNameTabItem, {
            [styles.active]: filter === tab.value || null,
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
