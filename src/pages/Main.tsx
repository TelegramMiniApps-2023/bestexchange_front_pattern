import React, { useEffect, useState } from "react";
import { Main } from "../components/main";
import { Preloader } from "../components/ui/preloader/preloader";

export const MainPage = () => {
  const [progress, setProgress] = useState(0);

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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div data-testid="main-page" className="page__wrapper">
      <Preloader progress={progress} strokeWidth={20} />
      <Main />
    </div>
  );
};
