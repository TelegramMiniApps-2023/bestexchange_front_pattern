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
    <section
      className={clsx(styles.arrowResultContainer, {
        [styles.activeResultContainer]: isSuccess,
      })}
    >
      {isSuccess ? (
        <IconDown fill="black" className={styles.arrowIcon} />
      ) : (
        <IconUp fill="black" className={styles.arrowIcon} />
      )}
    </section>
  );
};
