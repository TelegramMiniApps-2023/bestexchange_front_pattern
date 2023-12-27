import { FC, ReactElement } from "react";
import { AppRouter } from "./pages/appRouter";
import { BrowserRouter } from "react-router-dom";

import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";
import { Header } from "./components/header/header";
import { MainPage } from "./pages/Main";

const App: FC = (): ReactElement => {
  return (
    <div className="main__wrapper">
      {/* <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <AppRouter data-testid="approuter" />
        </BrowserRouter>
      </QueryClientProvider> */}
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>
    </div>
  );
};

export default App;
