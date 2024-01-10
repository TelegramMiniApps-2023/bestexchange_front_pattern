import { FC, ReactElement } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";
import { MainPage } from "./pages";

const App: FC = (): ReactElement => {
  return (
    <div className="main__wrapper">
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>
    </div>
  );
};

export default App;
