import { useTranslation } from "react-i18next";
import { Select } from "../select";
import styles from "./selectsForm.module.scss";
import { Options } from "../../model/Options";
import { useCashStore, useSelectsStore } from "../../store/store";
import { useEffect } from "react";
import { ResFetchAvailable } from "../../api/api";
import { availableKey } from "../../assets/consts";
import { queryClient } from "../../api/queryClient";
import { animated, config, useSpring } from "react-spring";

type SelectsFormCollapseProps = {
  get: Options | null;
  give: Options | null;
  isSuccess?: boolean;
  toggleArrow?: () => void;
};

export const SelectsFormCollapse = (props: SelectsFormCollapseProps) => {
  const { get, give, isSuccess, toggleArrow } = props;
  const { t, i18n } = useTranslation();
  const { location } = useCashStore((state) => state);
  const { setGetSelect, setGiveSelect } = useSelectsStore((state) => state);
  const options = queryClient.getQueryData<ResFetchAvailable>([
    availableKey,
    "all",
    location?.location.city?.code_name,
  ]);

  const currentOptions = i18n.language === "ru" ? options?.ru : options?.en;
  const availableDirection = queryClient.getQueryData<ResFetchAvailable>([
    availableKey,
    give?.code_name,
    location?.location.city?.code_name,
  ]);
  const currentAvailableDirection =
    i18n.language === "ru" ? availableDirection?.ru : availableDirection?.en;

  useEffect(() => {
    if (currentOptions) {
      if (give) {
        const currGive = Object.values(currentOptions)
          .flat()
          .filter((el) => el.code_name === give.code_name);
        setGiveSelect(currGive[0]);
      }
    }
    if (currentAvailableDirection) {
      if (get) {
        const currGet = Object.values(currentAvailableDirection)
          .flat()
          .filter((el) => el.code_name === get.code_name);
        setGetSelect(currGet[0]);
      }
    }
  }, [i18n.language]);

  return (
    <section onClick={toggleArrow} className={styles.selectsFormCollapse}>
      <animated.div className={styles.selectContainer}>
        <div>
          <h2 className={styles.selectsHeader}>{t("ОТДАЮ")}</h2>
          <h3 className={styles.selectName}>{give?.name}</h3>
        </div>
        <figure className={styles.iconFigure}>
          <img src={give?.icon_url} alt={`Иконка ${give?.name}`} />
        </figure>
      </animated.div>

      <div className={styles.separatorLine}></div>
      <animated.div className={styles.selectContainer}>
        <div>
          <h2 className={styles.selectsHeader}>{t("ПОЛУЧАЮ")}</h2>
          <h3 className={styles.selectName}>{get?.name}</h3>
        </div>
        <figure className={styles.iconFigure}>
          <img src={get?.icon_url} alt={`Иконка ${get?.name}`} />
        </figure>
      </animated.div>
    </section>
  );
};