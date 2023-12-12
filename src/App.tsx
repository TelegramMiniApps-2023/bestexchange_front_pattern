import { FC, ReactElement } from "react";
import { AppRouter } from "./pages/appRouter";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/header";

const App: FC = (): ReactElement => {
  return (
    <div className="main__wrapper">
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
