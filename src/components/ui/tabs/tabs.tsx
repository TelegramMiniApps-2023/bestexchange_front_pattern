// export type TabsItem = {
//   value: string;

import clsx from "clsx";
import styles from "./tabs.module.scss";
import { memo } from "react";
type TabsProps = {
  onTabClick: (tab: string) => void;
  tabs: string[];
  className?: string;
  filter?: string | null;
};
export const Tabs = memo((props: TabsProps) => {
  const { onTabClick, tabs, filter } = props;
  return (
    <div className={clsx(styles.tabs)}>
      {tabs.map((tab) => (
        <div
          className={clsx(styles.tabs__item, {
            [styles.active]: filter === tab,
          })}
          onClick={() => onTabClick(tab)}
          key={tab}
        >
          {tab}
        </div>
      ))}
    </div>
  );
});
