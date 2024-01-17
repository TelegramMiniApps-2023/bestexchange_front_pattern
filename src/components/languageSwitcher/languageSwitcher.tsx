// LanguageSwitcher.tsx
import { useTranslation } from "react-i18next";
import { Switch } from "../ui/switch";
import styles from "./languageSwitcher.module.scss";
export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };
  const currentLang =
    i18n.language === "ru"
      ? t("Переключить на Английский")
      : t("Переключить на Русский");
  return (
    <div className={styles.languageSwitcher}>
      <label>{currentLang}</label>
      <Switch onClick={toggle} />
    </div>
  );
};
