import { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import OptionStore from "./store/store";

interface ContextProps {
  store: OptionStore;
}

export const Context = createContext<ContextProps>({
  store: new OptionStore(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Context.Provider value={{ store: new OptionStore() }}>
    <App />
  </Context.Provider>
);
