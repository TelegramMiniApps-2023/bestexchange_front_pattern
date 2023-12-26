import { memo, useCallback } from "react";
import { directionTabsValute } from "../../assets/consts";
import { useDirectionTabsStore } from "../../store/store";
import { Tabs } from "../ui/tabs";
import styles from "./directionTabs.module.scss";

export const DirectionTabs = memo(() => {
  const valuteTypeTabs: string[] = directionTabsValute;
  const { setTypeValute, typeValute } = useDirectionTabsStore((state) => state);
  console.log(typeValute);

  const onTabClick = useCallback(
    (tab: string) => {
      setTypeValute(tab);
    },
    [setTypeValute]
  );
  return (
    <div className={styles.direction_tabs}>
      <Tabs
        tabs={valuteTypeTabs}
        onTabClick={onTabClick}
        filter={typeValute}
        className="directionTab"
      />
    </div>
  );
});
