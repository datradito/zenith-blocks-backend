import { lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Root from "./Root";
import ErrorPage from "./ErrorPage";
import PaymentCreation, {
  paymentLoader,
} from "../pages/Payments/PaymentCreation";
import NotFound from "./NotFound";
import SwapProvider from "../utils/Providers/SwapProvider";
import { SafeProvider } from "../Services/Safe/SafeProvider";

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
      errorElement={<ErrorPage />}
    >
      <Route
        path="proposals"
        element={<Proposals />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="proposals/:proposalId/budgets"
        element={<Budgets />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="invoice/:invoiceId/payment"
        element={<PaymentCreation />}
        errorElement={<ErrorPage />}
        loader={({ params }) => {
          return paymentLoader(params.invoiceId);
        }}
        action={({ params, request }) => {
          console.log(request);
        }}
      />
      <Route
        path="budgets/:budgetId/invoices"
        element={
          <SafeProvider>
            <Bills />
          </SafeProvider>
        }
        errorElement={<ErrorPage />}
      />
      <Route
        path="bills/misc"
        element={
          <SafeProvider>
            <Bills />
          </SafeProvider>
        }
        errorElement={<ErrorPage />}
      />
      <Route
        path="dashboard"
        element={
          <SafeProvider>
            <Dashboard />
          </SafeProvider>
        }
        errorElement={<ErrorPage />}
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
        errorElement={<ErrorPage />}
      /> */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
