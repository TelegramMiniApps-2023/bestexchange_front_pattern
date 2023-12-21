import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { describe, expect, it } from "vitest";
import { AppRouter } from "../pages/appRouter";
import { Header } from "../components/header/header";

// Создаем mock-клиент для React Query
const queryClient = new QueryClient();

describe("App Component", () => {
  it("renders App component with Header and AppRouter", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
      </QueryClientProvider>
    );

    // Проверяем, что компоненты Header и AppRouter отрисованы
    expect(screen.getByText(/Money Exchange/i)).toBeInTheDocument();
    // expect(screen.getByRole("link")).toBeInTheDocument();
  });
});
