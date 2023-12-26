// export type TabsItem = {
//   value: string;

import clsx from "clsx";
import styles from "./tabs.module.scss";
import { memo } from "react";
export type TabsItem = {
  value: string;
  content: string;
};
type TabsProps = {
  onTabClick: (tab: TabsItem) => void;
  tabs: TabsItem[];
  className?: string;
  filter?: string | null;
};
export const Tabs = memo((props: TabsProps) => {
  const { onTabClick, tabs, filter, className } = props;

  return (
    <div className={clsx(styles.tabs)}>
      {tabs.map((tab) => (
        <div
          className={clsx(styles.tabs__item, className, {
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
