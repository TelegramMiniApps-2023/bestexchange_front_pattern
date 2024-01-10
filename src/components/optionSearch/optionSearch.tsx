import { FC, memo } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import styles from "./optionSearch.module.scss";
import { useFiltersStore } from "../../store/store";

interface OptionSearchProps {}

export const OptionSearch: FC<OptionSearchProps> = memo(() => {
  const value = useFiltersStore((state) => state.search);
  const setValue = useFiltersStore((state) => state.setSearch);
  return (
    <section className={styles.search}>
      <span>
        <SearchIcon width="20px" height="20px" />
      </span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Поиск..."
      />
    </section>
  );
});
