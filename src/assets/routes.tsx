import { AboutPage } from "../pages/About";
import { ServicesPage } from "../pages/Services";
import { ABOUT_ROUTE, SERVICES_ROUTE } from "./consts";

export const publicRoutes = [
  {
    path: ABOUT_ROUTE,
    element: <AboutPage />,
    name: "О нас",
  },
  {
    path: SERVICES_ROUTE,
    element: <ServicesPage />,
    name: "Сервисы",
  },
];
