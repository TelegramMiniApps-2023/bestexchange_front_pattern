import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.scss";

// interface ContextProps {
//   store: OptionStore;
// }

// export const Context = createContext<ContextProps>({
//   store: new OptionStore(),
// });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
