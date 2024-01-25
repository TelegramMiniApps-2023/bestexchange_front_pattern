import { memo, useEffect, useState } from "react";
import { useFetchExchangers } from "../../api/api";
import { useCashStore, useSelectsStore } from "../../store/store";
import { DirectionTabs } from "../directionTabs";
import { ExchangerLoader } from "../exchangerLoader";
import { LocationSelect } from "../locationSelect";
import styles from "./main.module.scss";
import { ResultArrow } from "../resultArrow";
import { SelectsForm, SelectsFormCollapse } from "../selectsForm";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../languageSwitcher";
import { animated, config, useSpring } from "react-spring";

export const Main = memo(() => {
  const give = useSelectsStore((state) => state.giveSelect);
  const get = useSelectsStore((state) => state.getSelect);
  const setGetSelect = useSelectsStore((state) => state.setGetSelect);
  const { i18n } = useTranslation();
  const { location } = useCashStore((state) => state);
  const [isCollapse, setIsCollapse] = useState(false);
  const {
    data: exchangers,
    isLoading,
    isFetching,
    refetch,
    isSuccess,
    error,
  } = useFetchExchangers({
    from: give?.code_name,
    to: get?.code_name,
    city: location?.location?.city.code_name,
  });
  useEffect(() => {
    setIsCollapse(true);
  }, [isSuccess]);
  useEffect(() => {
    if (error) {
      setGetSelect(null);
    }
  }, [error, setGetSelect]);
  const collapsedForm = isSuccess && isCollapse;
  const toggleArrow = () => {
    if (isSuccess) {
      setIsCollapse((prev) => !prev);
    }
  };

  return (
    <main className={styles.main}>
      <DirectionTabs />
      <LocationSelect />
      <div className={styles.container}>
        <div>
          {collapsedForm ? (
            <SelectsFormCollapse isSuccess={isSuccess} get={get} give={give} />
          ) : (
            <SelectsForm
              isSuccess={isSuccess}
              get={get}
              give={give}
              refetch={refetch}
            />
          )}
          <div onClick={toggleArrow} className={styles.resultArrow}>
            <ResultArrow isSuccess={collapsedForm} />
          </div>
        </div>
        <ExchangerLoader
          error={error}
          exchangers={exchangers}
          isFetching={isFetching}
          isLoading={isLoading}
        />
        <div className={styles.languageSwitcher}>
          <LanguageSwitcher />
        </div>
      </div>
    </main>
  );
});
