import { useSpring, animated, easings } from "react-spring";
import { useTranslation } from "react-i18next";
import { Switch } from "../ui/switch";
import styles from "./languageSwitcher.module.scss";
import { memo } from "react";

export const LanguageSwitcher = memo(() => {
  const { i18n, t } = useTranslation();

  const [spring, setSpring] = useSpring(() => ({
    from: { transform: "translateY(20px)", opacity: 0 },
    to: { transform: "translateY(0px)", opacity: 1 },
    config: { duration: 1000 },
  }));

  const toggle = async () => {
    // setSpring({ transform: "translateY(3px)" });
    // await new Promise((resolve) => setTimeout(resolve, 200));
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
    // setSpring({ transform: "translateY(0px)" });
  };

  const currentLang =
    i18n.language === "ru"
      ? t("Переключить на Английский")
      : t("Переключить на Русский");

  return (
    <animated.div style={spring} className={styles.languageSwitcher}>
      <label className={styles.currentLanguage}>{currentLang}</label>
      <Switch onClick={toggle} />
    </animated.div>
  );
});
