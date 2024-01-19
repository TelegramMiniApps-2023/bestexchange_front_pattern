import clsx from "clsx";
import { memo } from "react";
import { useTrail, animated } from "react-spring";
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
  animationProps?: {
    from?: Record<string, unknown>;
    to?: Record<string, unknown>;
    config?: Record<string, unknown>;
  };
  classNameActiveDirection?: string;
};

export const Tabs = memo((props: TabsProps) => {
  const {
    onTabClick,
    tabs,
    filter,
    classNameTab,
    classNameTabItem,
    animationProps,
    classNameActiveDirection,
  } = props;

  const trail = useTrail(tabs.length, {
    ...animationProps,
  });

  return (
    <div className={clsx(styles.tabs, classNameTab)}>
      {trail.map((styles, index) => (
        <animated.div key={tabs[index].value} style={styles}>
          <Tab
            classNameTabItem={classNameTabItem}
            onTabClick={onTabClick}
            tab={tabs[index]}
            filter={filter}
            key={tabs[index].value}
            classNameActiveDirection={classNameActiveDirection}
          />
        </animated.div>
      ))}
    </div>
  );
});
