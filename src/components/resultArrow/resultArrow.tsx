import { memo } from "react";
import { IconUp } from "../../assets/icons/IconUp";
import { Button } from "../ui/button";
import styles from "./resultArrow.module.scss";
import { IconDown } from "../../assets/icons/IconDown";
type ResultArrowProps = {
  isLoading?: boolean;
  isSuccess?: boolean;
};
export const ResultArrow = (props: ResultArrowProps) => {
  const { isLoading, isSuccess } = props;

  return (
    <Button className={styles.iconContainer}>
      {isSuccess ? (
        <IconDown className={styles.arrow} />
      ) : (
        <IconUp className={styles.arrow} />
      )}
    </Button>
  );
};
