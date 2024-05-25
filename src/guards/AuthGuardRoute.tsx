import { Navigate, Outlet } from "react-router-dom";
import useAppStore from "src/store/store";

export const ProtectedRoute = () => {

  const [currentProduct] = useAppStore((state) => [state.currentProduct]);

  return Object.keys(currentProduct).length !== 0 ? <Outlet /> : <Navigate to="/" />;
};
