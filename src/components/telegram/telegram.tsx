export const Telegram = () => {
  // инициализация webapp
  const tg = window.Telegram.WebApp;
  tg.enableClosingConfirmation();
  tg.expand();
  tg.ready();

  const alertKeysAndValues = (obj: { [key: string]: any }) => {
    for (const [key, value] of Object.entries(obj)) {
      alert(`${key}: ${value}`);
    }
  };
  alertKeysAndValues(tg.initDataUnsafe.user);
  return <div></div>;
};
