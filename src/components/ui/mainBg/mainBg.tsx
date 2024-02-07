import { memo, useEffect, useState } from "react";
import styles from "./mainBg.module.scss";
import clsx from "clsx";
import { Path_1 } from "./path_1";
import { Path_2 } from "./path_2";
import { Path_3 } from "./path_3";
import { Path_4 } from "./path_4";
import { Path_5 } from "./path_5";
import { Path_6 } from "./path_6";
export const MainBg = memo((props: any) => {
  const [isActiveOverlay, setActiveOverlay] = useState(false);
  const [isActiveContainer, setActiveContainer] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setActiveOverlay(false);
      setActiveContainer(true);
    }, 2000);
    setActiveOverlay(true);
    // setActiveContainer(true);
  }, []);
  return (
    <div
      className={clsx(styles.container, {
        [styles.active_container]: isActiveContainer,
      })}
    >
      <div className={styles.paths_container}>
        <div
          className={clsx(styles.path, {
            [styles.path_1]: isActiveContainer,
          })}
        >
          <Path_1 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_2]: isActiveContainer,
          })}
        >
          <Path_2 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_3]: isActiveContainer,
          })}
        >
          <Path_3 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_4]: isActiveContainer,
          })}
        >
          <Path_4 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_5]: isActiveContainer,
          })}
        >
          <Path_5 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_6]: isActiveContainer,
          })}
        >
          <Path_6 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_7]: isActiveContainer,
          })}
        >
          <Path_1 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_8]: isActiveContainer,
          })}
        >
          <Path_2 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_9]: isActiveContainer,
          })}
        >
          <Path_3 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_10]: isActiveContainer,
          })}
        >
          <Path_4 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_11]: isActiveContainer,
          })}
        >
          <Path_5 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_12]: isActiveContainer,
          })}
        >
          <Path_6 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_13]: isActiveContainer,
          })}
        >
          <Path_1 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_14]: isActiveContainer,
          })}
        >
          <Path_2 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_15]: isActiveContainer,
          })}
        >
          <Path_3 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_16]: isActiveContainer,
          })}
        >
          <Path_4 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_5]: isActiveContainer,
          })}
        >
          <Path_5 />
        </div>
        <div
          className={clsx(styles.path, {
            [styles.path_6]: isActiveContainer,
          })}
        >
          <Path_6 />
        </div>
      </div>
      <div
        className={clsx(styles.overlay, {
          [styles.active_overlay]: isActiveOverlay,
        })}
      ></div>
    </div>
  );
});
