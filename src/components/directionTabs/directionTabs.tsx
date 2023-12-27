import { memo, useCallback } from "react";
import { directionTabsValute } from "../../assets/consts";
import {
  useCashStore,
  useDirectionTabsStore,
  useSelectsStore,
} from "../../store/store";
import { Tabs } from "../ui/tabs";
import styles from "./directionTabs.module.scss";
import { TabsItem } from "../ui/tabs/tabs";

export const DirectionTabs = memo(() => {
  const valuteTypeTabs = directionTabsValute;
  const { setTypeValute, typeValute } = useDirectionTabsStore((state) => state);
  const { setGetSelect, setGiveSelect } = useSelectsStore((state) => state);
  const { setCountry, setCity } = useCashStore((state) => state);
  console.log(typeValute);

  const onTabClick = useCallback(
    (tab: TabsItem) => {
      setTypeValute(tab.value);
      setGetSelect(null);
      setGiveSelect(null);
      setCountry(null);
      setCity(null);
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
