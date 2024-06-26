import { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { ProtectedRoute } from "src/guards/AuthGuardRoute";
import { DashboardLayout } from "src/layouts/DashboardLayout";

export const IndexPage = lazy(() => import("src/pages/app"));
export const LoginPage = lazy(() => import("src/pages/login"));
export const RegisterPage = lazy(() => import("src/pages/register/register"));
export const ProfilePage = lazy(() => import("src/pages/profile/profile"));
export const TradeInPage = lazy(() => import("src/pages/trade-in/trade-in"));
export const CheckoutPage = lazy(() => import("src/pages/checkout/checkout"));
export const SalesPage = lazy(() => import("src/pages/sales/sales"));
export const Page404 = lazy(() => import("src/pages/page-not-found"));
export const ResumePage = lazy(() => import("src/pages/resume/resume"));

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
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "resume/:uuid", element: <ResumePage /> },
        { path: "trade-in", element: <TradeInPage /> },
        { path: "checkout", element: <CheckoutPage /> },
        {
          element: <ProtectedRoute />,
          children: [{ path: "my-sales", element: <SalesPage /> }],
        }
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
