import { FC, ReactElement } from "react";
import { AppRouter } from "./pages/appRouter";
import { BrowserRouter } from "react-router-dom";

import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";
import { Header } from "./components/header/header";

const App: FC = (): ReactElement => {
  return (
    <div className="main__wrapper">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
