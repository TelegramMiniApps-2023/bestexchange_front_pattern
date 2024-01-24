export const Telegram = () => {
  // инициализация webapp
  const tg = window.Telegram.WebApp;
  tg.enableClosingConfirmation();
  tg.expand();
  tg.ready();
  console.log(tg);
  console.log(tg?.WebAppUser?.id);
  return <div></div>;
};
