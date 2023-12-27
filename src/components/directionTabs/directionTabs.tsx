import { memo, useCallback } from "react";
import { directionTabsValute } from "../../assets/consts";
import { useDirectionTabsStore } from "../../store/store";
import { Tabs } from "../ui/tabs";
import styles from "./directionTabs.module.scss";
import { TabsItem } from "../ui/tabs/tabs";

export const DirectionTabs = memo(() => {
  const valuteTypeTabs = directionTabsValute;
  const { setTypeValute, typeValute } = useDirectionTabsStore((state) => state);
  console.log(typeValute);

  const onTabClick = useCallback(
    (tab: TabsItem) => {
      setTypeValute(tab.value!);
    },
    [setTypeValute]
  );
  return (
    <div className={styles.direction_wrapper}>
      <Tabs
        tabs={valuteTypeTabs}
        onTabClick={onTabClick}
        filter={typeValute}
        classNameTab={styles.direction_tabs}
        classNameTabItem={styles.direction_tabs_item}
      />
    </div>
  );
});
