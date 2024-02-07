import { memo, useCallback, useEffect, useState } from "react";
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
  const setExchangersError = useSelectsStore((state) => state.setExchangersError);
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
  }, [exchangers]);
  useEffect(() => {
    if (error) {
      setGetSelect(null);
    }
    setExchangersError(error)
  }, [error]);
  const collapsedForm = isSuccess && isCollapse;
  const toggleArrow = useCallback(() => {
    if (isSuccess) {
      setIsCollapse((prev) => !prev);
    }
  },[isSuccess]);

  // const selectsFormSpring = useSpring({
  //   opacity: collapsedForm ? 0 : 1,
  //   transform: collapsedForm
  //     ? "translateY(-50px) scale(0.4)"
  //     : "translateY(0) scale(1)",

  //   config: config.gentle,
  // });

  const selectsFormCollapseSpring = useSpring({
    opacity: collapsedForm ? 1 : 0,
    transform: collapsedForm
      ? "translateY(0) scale(1)"
      : "translateY(50px) scale(0.4)",
    config: config.gentle,
  });

  return (
    <main className={styles.main}>
      <DirectionTabs />
      <LocationSelect />
      <div className={styles.container}>
        <div>
          {collapsedForm ? (
            <animated.div style={selectsFormCollapseSpring}>
              <SelectsFormCollapse
                toggleArrow={toggleArrow}
                isSuccess={isSuccess}
                get={get}
                give={give}
              />
              <div onClick={toggleArrow} className={styles.resultArrow}>
                <ResultArrow isSuccess={collapsedForm} />
              </div>
            </animated.div>
          ) : (
            <animated.div>
              <SelectsForm get={get} give={give} refetch={refetch} />
              <div onClick={toggleArrow} className={styles.resultArrow}>
                <ResultArrow isSuccess={collapsedForm} />
              </div>
            </animated.div>
          )}
        </div>
        <ExchangerLoader
          error={error}
          exchangers={exchangers}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </div>
      <footer className={styles.languageSwitcher}>
        <LanguageSwitcher />
      </footer>
    </main>
  );
});
