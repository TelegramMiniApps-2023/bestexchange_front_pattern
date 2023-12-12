import { FC, useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import styles from "./styles.module.css";

interface SearchInputProps {
  type: string;
}

export const SearchInput: FC<SearchInputProps> = ({ type }) => {
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
};
