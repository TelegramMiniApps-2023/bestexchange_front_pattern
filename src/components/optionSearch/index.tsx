import { FC, memo, useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import styles from "./styles.module.scss";

interface SearchInputProps {
  type: string;
}

export const SearchInput: FC<SearchInputProps> = memo(({ type }) => {
  const [value, setValue] = useState("");
  return (
    <div className={styles.search}>
      <div className={styles.search__icon}>
        <SearchIcon width="20px" height="20px" />
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.search__input}
        type="text"
        placeholder="Поиск..."
      />
    </div>
  );
});
