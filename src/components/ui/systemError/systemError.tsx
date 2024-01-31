import { FC } from "react";
import styles from "./systemError.module.scss";
import { useTranslation } from "react-i18next";

interface SystemErrorProps {
  network?: boolean;
  direction?: boolean;
  response?: boolean;
}

export const SystemError: FC<SystemErrorProps> = ({
  network,
  direction,
  response,
}) => {
  const { t } = useTranslation();
  return (
    <section className={styles.error}>
      <p>
        {direction
          ? `${t("Выбранное направление недоступно")}`
          : response && `${t("Системная ошибка")}`}
      </p>
      <div>
        <img src="/img/errorIcon.png" />
        <img src="/img/errorIcon.png" />
        <img src="/img/errorIcon.png" />
      </div>
    </section>
  );
};
