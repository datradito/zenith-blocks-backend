import { lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Root from "./Root";
import Payment from "../pages/Payments/Payment";
import NotFound from "./NotFound";
import SwapProvider from "../utils/Providers/SwapProvider";
import { SafeProvider } from "../Services/Safe/SafeProvider";
import ErrorFallback from "../Components/atoms/ErrorFallback/ErrorFallback";

const Swap = lazy(() => import("../pages/Swap/Swap"));
const Budgets = lazy(() => import("../pages/Budgets/Budgets"));
const Bills = lazy(() => import("../pages/Bills/Bills"));

const Dashboard = lazy(() => import("../pages/WalletDashboard/Dashboard"));
const Proposals = lazy(() => import("../pages/Proposals/Proposals"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <PrivateRoute>
          <Root />
        </PrivateRoute>
      }
      errorElement={
        <ErrorFallback
          resetErrorBoundary={() => window.location.reload(false)}
        />
      }
    >
      <Route
        path="proposals"
        element={<Proposals />}
        errorElement={
          <ErrorFallback
            resetErrorBoundary={() => window.location.reload(false)}
          />
        }
      />
      <Route
        path="proposals/:proposalId/budgets"
        element={<Budgets />}
        errorElement={
          <ErrorFallback
            resetErrorBoundary={() => window.location.reload(false)}
          />
        }
      />
      <Route
        path="invoice/:invoiceId/payment"
        element={<Payment />}
        errorElement={
          <ErrorFallback
            resetErrorBoundary={() => window.location.reload(false)}
          />
        }
      />
      <Route
        path="budgets/:budgetId/invoices"
        element={
          <SafeProvider>
            <Bills />
          </SafeProvider>
        }
        errorElement={
          <ErrorFallback
            resetErrorBoundary={() => window.location.reload(false)}
          />
        }
      />
      <Route
        path="bills/misc"
        element={
          <SafeProvider>
            <Bills />
          </SafeProvider>
        }
        errorElement={
          <ErrorFallback
            resetErrorBoundary={() => window.location.reload(false)}
          />
        }
      />
      <Route
        path="dashboard"
        element={
          <SafeProvider>
            <Dashboard />
          </SafeProvider>
        }
        errorElement={
          <ErrorFallback
            resetErrorBoundary={() => window.location.reload(false)}
          />
        }
      />

      {/* 
      Disabling this route for now, until we finish other essential work
      <Route
        path="swap"
        element={
          <SwapProvider>
            <Swap />
          </SwapProvider>
        }
       errorElement={<ErrorFallback resetErrorBoundary={() => window.location.reload(false)} />}
      /> */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
