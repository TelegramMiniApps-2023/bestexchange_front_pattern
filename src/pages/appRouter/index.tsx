import { Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes } from "../../assets/routes";
import { MainPage } from "../Main";

export const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
