import { memo } from "react";
import { useTranslation } from "react-i18next";
import { RussiaIcon } from "../../assets/icons/IconRussia";
import { USAIcon } from "../../assets/icons/IconUsa";
import { Switch } from "../ui/switch";
import styles from "./languageSwitcher.module.scss";

export const LanguageSwitcher = memo(() => {
  const { i18n, t } = useTranslation();

  // const [spring, setSpring] = useSpring(() => ({
  //   from: { transform: "translateY(20px)", opacity: 0 },
  //   to: { transform: "translateY(0px)", opacity: 1 },
  //   config: { duration: 500 },
  // }));

  const toggle = async () => {
    // setSpring({ transform: "translateY(3px)" });
    // await new Promise((resolve) => setTimeout(resolve, 200));
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
    // setSpring({ transform: "translateY(0px)" });
  };

  const currentLang = i18n.language === "ru" ? "Русский" : "English";
  const currentIcon =
    i18n.language === "ru" ? (
      <RussiaIcon width="50px" height="50px" />
    ) : (
      <USAIcon width="50px" height="50px" />
    );
  return (
    <div className={styles.languageSwitcher}>
      <span className={styles.currentIcon}>{currentIcon}</span>
      <label className={styles.currentLang}>{currentLang}</label>
      <Switch onClick={toggle} />
    </div>
  );
});
