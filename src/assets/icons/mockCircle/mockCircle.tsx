import { FC } from "react";
import styles from "./mockCircle.module.scss";

interface MockCircleProps {
  width?: string;
  height?: string;
}

export const MockCircle: FC<MockCircleProps> = ({
  width = "100%",
  height = "100%",
}) => {
  return <div style={{ width, height }} className={styles.circle}></div>;
};
