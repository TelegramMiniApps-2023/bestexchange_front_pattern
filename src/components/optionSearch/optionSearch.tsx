import { FC, memo } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import styles from "./optionSearch.module.scss";
import { useFiltersStore } from "../../store/store";
import { useTranslation } from "react-i18next";

type SearchName = "cash" | "noCash";
interface OptionSearchProps {
  type?: SearchName;
}

export const OptionSearch: FC<OptionSearchProps> = memo(({ type }) => {
  const value = useFiltersStore((state) => state.search);
  const setValue = useFiltersStore((state) => state.setSearch);
  const { t } = useTranslation();
  const search = type === "cash" ? t("Поиск страны и города") : t("Поиск");
  const placeholder = search ? search : t("Поиск");
  return (
    <section className={styles.search}>
      <span  className={styles.icon}>
        <SearchIcon width="30px" height="30px" />
      </span>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder={placeholder}
      />
    </section>
  );
});
