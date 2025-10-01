import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrderSuccessPage } from '@/pages/OrderSuccessPage';
import { AccountPage } from '@/pages/AccountPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/order-success",
    element: <OrderSuccessPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/account",
    element: <AccountPage />,
    errorElement: <RouteErrorBoundary />,
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)