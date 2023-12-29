import { memo, useEffect } from "react";
import { useFetchExchangers } from "../../api/api";
import { useSelectsStore } from "../../store/store";
import { DirectionTabs } from "../directionTabs";
import { SelectsForm } from "../selectsForm";
import { ExchangerLoader } from "../exchangerLoader";
import styles from "./styles.module.scss";
import { LocationSelect } from "../locationSelect";

export const Main = memo(() => {
  // const { refetch: refetchAvailable } = useFetchAvailable({ base: "all" });
  // useEffect(() => {
  //   refetchAvailable();
  // }, [refetchAvailable]);

  const give = useSelectsStore((state) => state.giveSelect);
  const get = useSelectsStore((state) => state.getSelect);
  const setGetSelect = useSelectsStore((state) => state.setGetSelect);

  const {
    data: exchangers,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useFetchExchangers({
    from: give?.code_name,
    to: get?.code_name,
  });

  useEffect(() => {
    if (error) {
      // setGiveSelect(null);
      setGetSelect(null);
    }
  }, [error]);

  return (
    <div className={styles.main}>
      <DirectionTabs />
      <LocationSelect />
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
