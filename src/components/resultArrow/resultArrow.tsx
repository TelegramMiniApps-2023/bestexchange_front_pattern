import { memo } from "react";
import { IconDown } from "../../assets/icons/IconDown";
import { IconUp } from "../../assets/icons/IconUp";
import styles from "./resultArrow.module.scss";
import clsx from "clsx";
type ResultArrowProps = {
  isSuccess: boolean;
};
export const ResultArrow = (props: ResultArrowProps) => {
  const { isSuccess } = props;

  return (
    <div
      className={clsx(styles.arrowResultContainer, {
        [styles.activeResultContainer]: isSuccess,
      })}
    >
      {isSuccess ? (
        <IconDown className={styles.arrowIcon} />
      ) : (
        <IconUp className={styles.arrowIcon} />
      )}
    </div>
  );
};
