import { memo, useCallback, useMemo } from "react";
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
import { useTranslation } from "react-i18next";

export const DirectionTabs = memo(() => {
  const { setTypeValute, typeValute } = useDirectionTabsStore((state) => state);
  const { t } = useTranslation();
  const directionTabs = useMemo<TabsItem[]>(
    () => [
      {
        content: t(`${directionTabsValute[0].content}`),
        value: directionTabsValute[0].value,
      },
      {
        content: t(`${directionTabsValute[1].content}`),
        value: directionTabsValute[1].value,
      },
    ],
    [t]
  );
  const { setGetSelect, setGiveSelect } = useSelectsStore((state) => state);
  const { setLocation } = useCashStore((state) => state);

  const onTabClick = useCallback(
    (tab: TabsItem) => {
      setGetSelect(null);
      setGiveSelect(null);
      setLocation(null);
      clearExchangers();
      setTypeValute(tab.value!);
    },
    [setGetSelect, setGiveSelect, setLocation, setTypeValute]
  );

  // clear exchangers data
  const queryClient = useQueryClient();
  const clearExchangers = () => {
    queryClient.removeQueries([exchangersKey]);
  };

  return (
    <section className={styles.direction_wrapper}>
      <Tabs
        tabs={directionTabs}
        onTabClick={onTabClick}
        filter={typeValute}
        classNameTab={styles.direction_tabs}
        classNameTabItem={styles.direction_tabs_item}
        animationProps={{
          from: { opacity: 0, transform: "translateY(-40px)" },
          to: { opacity: 1, transform: "translateY(0)" },
          config: { tension: 700, friction: 50 },
        }}
        classNameActiveDirection={styles.active_direction}
      />
    </section>
  );
});
