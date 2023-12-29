import { memo, useEffect } from "react";
import { useFetchExchangers } from "../../api/api";
import { useSelectsStore } from "../../store/store";
import { DirectionTabs } from "../directionTabs";
import { SelectsForm } from "../selectsForm";
import { ExchangerLoader } from "../exchangerLoader";
import styles from "./styles.module.scss";
import { ResultArrow } from "../resultArrow";

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
    isSuccess,
    refetch,
    error,
  } = useFetchExchangers({
    from: give?.code_name,
    to: get?.code_name,
  });
  console.log(isSuccess);
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
      <div className={styles.main__body}>
        <SelectsForm get={get} give={give} refetch={refetch} />
        <div className={styles.main_resultArrow}>
          <ResultArrow isLoading isSuccess />
        </div>
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
