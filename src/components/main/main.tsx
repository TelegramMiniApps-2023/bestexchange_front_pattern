import { memo, useEffect } from "react";
import { useFetchCashCountries, useFetchExchangers } from "../../api/api";
import {
  useCashStore,
  useDirectionTabsStore,
  useSelectsStore,
} from "../../store/store";
import { DirectionTabs } from "../directionTabs";
import { SelectsForm } from "../selectsForm";
import { ExchangerLoader } from "../exchangerLoader";
import styles from "./styles.module.scss";
import { LocationSelect } from "../locationSelect";
import clsx from "clsx";
import { directionTabsValute } from "../../assets/consts";

export const Main = memo(() => {
  // const { refetch: refetchAvailable } = useFetchAvailable({ base: "all" });
  // useEffect(() => {
  //   refetchAvailable();
  // }, [refetchAvailable]);

  // fetch

  const give = useSelectsStore((state) => state.giveSelect);
  const get = useSelectsStore((state) => state.getSelect);
  const setGetSelect = useSelectsStore((state) => state.setGetSelect);
  const { location } = useCashStore((state) => state);
  // Countries fetching
  const { data: countries } = useFetchCashCountries();
  const typeValute = useDirectionTabsStore((state) => state.typeValute);
  const {
    data: exchangers,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useFetchExchangers({
    from: give?.code_name,
    to: get?.code_name,
    city: location?.location?.city.code_name,
  });

  useEffect(() => {
    if (error) {
      // setGiveSelect(null);
      setGetSelect(null);
    }
  }, [error]);

  // временно

  return (
    <div className={styles.main}>
      <DirectionTabs />
      {countries && (
        <div
          className={clsx(styles.location, {
            [styles.active]: typeValute === directionTabsValute[1].value,
          })}
        >
          <LocationSelect typeValute={typeValute} countries={countries} />
        </div>
      )}
      <div className={styles.main__body}>
        <SelectsForm get={get} give={give} refetch={refetch} />
        <ExchangerLoader
          error={error}
          exchangers={exchangers}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
});
