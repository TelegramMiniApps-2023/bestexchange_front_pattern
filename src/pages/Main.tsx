import React, { useEffect, useState } from "react";
import { Main } from "../components/main";
import { Preloader } from "../components/ui/preloader/preloader";
import styles from "./mainPage.module.scss";
export const MainPage = () => {
  const [progress, setProgress] = useState(0);
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  useEffect(() => {
    let prevProgress = 0;

    const interval = setInterval(() => {
      const randomIncrement = Math.ceil(Math.random() * 10);
      const newProgress = Math.min(prevProgress + randomIncrement, 100);

      setProgress(newProgress);

      prevProgress = newProgress;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setPreloaderFinished((prev) => !prev);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div data-testid="main-page" className="page__wrapper">
      {preloaderFinished ? (
        <Main />
      ) : (
        <div className={styles.preloaderContainer}>
          <Preloader progress={progress} strokeWidth={20} />
        </div>
      )}
    </div>
  );
};
