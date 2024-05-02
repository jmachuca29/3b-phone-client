import { Navigate, Outlet } from "react-router-dom";
import useAppStore from "src/store/store";

export const ProtectedRoute = () => {

  const [product] = useAppStore((state) => [state.product]);

  return Object.keys(product).length !== 0 ? <Outlet /> : <Navigate to="/" />;
};
