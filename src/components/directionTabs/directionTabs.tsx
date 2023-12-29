import { memo, useCallback } from "react";
import { directionTabsValute, exchangersKey } from "../../assets/consts";
import {
  useCashStore,
  useDirectionTabsStore,
  useSelectsStore,
} from "../../store/store";
import { Tabs } from "../ui/tabs";
import styles from "./directionTabs.module.scss";
import { TabsItem } from "../ui/tabs/tabs";
import { useQueryClient } from "react-query";

export const DirectionTabs = memo(() => {
  const valuteTypeTabs = directionTabsValute;
  const { setTypeValute, typeValute } = useDirectionTabsStore((state) => state);

  const { setGetSelect, setGiveSelect } = useSelectsStore((state) => state);
  // const { setCountry, setCity } = useCashStore((state) => state);
  const { setLocation } = useCashStore((state) => state);

  const onTabClick = useCallback(
    (tab: TabsItem) => {
      setGetSelect(null);
      setGiveSelect(null);
      // setCountry(null);
      // setCity(null);
      setLocation(null);
      clearExchangers();
      setTypeValute(tab.value!);
    },
    [setTypeValute]
  );

  // clear exchangers data
  const queryClient = useQueryClient();
  const clearExchangers = () => {
    queryClient.removeQueries([exchangersKey]);
  };

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
