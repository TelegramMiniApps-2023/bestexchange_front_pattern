export const Telegram = () => {
  // инициализация webapp
  const tg = window.Telegram.WebApp;
  tg.enableClosingConfirmation();
  tg.expand();
  tg.ready();
  alert(tg?.WebAppUser?.id);
  alert(tg?.initData);
  alert(tg?.initDataUnsafe?.id);
  return <div></div>;
};
