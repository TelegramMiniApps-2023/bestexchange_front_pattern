import clsx from "clsx";
import { memo } from "react";
import styles from "./tabs.module.scss";
import { Tab } from "./tab";
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
  const { onTabClick, tabs, filter, classNameTab, classNameTabItem } = props;

  return (
    <div className={clsx(styles.tabs, classNameTab)}>
      {tabs.map((tab) => (
        <Tab
          classNameTabItem={classNameTabItem}
          onTabClick={onTabClick}
          tab={tab}
          filter={filter}
          key={tab.value}
        />
      ))}
    </div>
  );
});
