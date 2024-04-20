import { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { ProtectedRoute } from "src/guards/AuthGuardRoute";
import { DashboardLayout } from "src/layouts/DashboardLayout";
import RegisterPage from "src/pages/register";

export const IndexPage = lazy(() => import("src/pages/app"));
export const TradeInPage = lazy(() => import("src/pages/trade-in"));
export const Page404 = lazy(() => import("src/pages/page-not-found"));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: "register", element: <RegisterPage /> },
        {
          element: <ProtectedRoute />,
          children: [{ path: "trade-in", element: <TradeInPage /> }],
        },
      ],
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
