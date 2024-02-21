import { lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Root from "./Root";
import ErrorPage from "./ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import ProposalRoute from "./ProposalDependentRoutes";
import PaymentCreation, {
  paymentLoader,
} from "../Components/pages/Payments/PaymentCreation";
import InvoiceRoutes from "./InvoiceDependentRoutes";
import NotFound from "./NotFound";
import MemoizedInvoiceProvider from "../Utility/Providers/InvoiceProvider";
import SwapProvider from "../Utility/Providers/SwapProvider";
import { AccountAbstractionProvider } from "../Utility/Providers/AccountAbstractionContext";
const Swap = lazy(() => import("../Components/pages/Swap/Swap"));
const ProposalDetailView = lazy(() =>
  import("../Components/features/proposals/ProposalDetailView")
);
const CreateBudget = lazy(() =>
  import("../Components/pages/Budgets/CreateBudget")
);
const InvoiceListView = lazy(() =>
  import("../Components/pages/Invoices/InvoiceListView")
);
const InvoiceCreation = lazy(() =>
  import("../Components/features/invoices/CreateInvoice")
);
const Dashboard = lazy(() =>
  import("../Components/pages/walletDashboard/Dashboard")
);
const Proposals = lazy(() => import("../Components/pages/Proposals/Proposals"));
const Accounts = lazy(() => import("../Components/pages/Accounts/Accounts"));

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
        element={
          <ProtectedRoute path="/*">
            <Proposals />
          </ProtectedRoute>
        }
        errorElement={<ErrorPage />}
      />
      <Route
        path="proposals/:proposalId/budgets"
        element={
          <ProtectedRoute path="/*">
            <ProposalDetailView />
          </ProtectedRoute>
        }
        errorElement={<ErrorPage />}
      />
      <Route
        path="budgets"
        element={
          <ProtectedRoute path="/*">
            <ProposalRoute />
          </ProtectedRoute>
        }
      >
        <Route
          path=":proposalId/create"
          element={
            <ProtectedRoute path="/*">
              <CreateBudget />
            </ProtectedRoute>
          }
          errorElement={<ErrorPage />}
        />
      </Route>

      <Route
        path="invoice/:invoiceId/payment"
        element={
          <ProtectedRoute path="/*">
            <PaymentCreation />
          </ProtectedRoute>
        }
        errorElement={<ErrorPage />}
        loader={({ params }) => {
          return paymentLoader(params.invoiceId);
        }}
        action={({ params, request }) => {
          console.log(request);
        }}
      />
      <Route
        path="budgets"
        element={
          <ProtectedRoute path="/*">
            <InvoiceRoutes />
          </ProtectedRoute>
        }
      >
        <Route
          path=":budgetId/invoices"
          element={
            <ProtectedRoute path="/*">
              <MemoizedInvoiceProvider>
                <InvoiceListView />
              </MemoizedInvoiceProvider>
            </ProtectedRoute>
          }
          errorElement={<ErrorPage />}
        />
      </Route>
      <Route
        path="invoices/:budgetId/create"
        errorElement={<ErrorPage />}
        element={
          <ProtectedRoute path="/*">
            <InvoiceCreation />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute path="/*">
            <Dashboard />
          </ProtectedRoute>
        }
        errorElement={<ErrorPage />}
      />
      <Route
        path="swap"
        element={
          <ProtectedRoute path="/*">
            <SwapProvider>
              <Swap />
            </SwapProvider>
          </ProtectedRoute>
        }
        errorElement={<ErrorPage />}
      />
      <Route path="*" element={<NotFound />} />
      <Route
        path="budgets"
        element={
          <ProtectedRoute path="/*">
            <InvoiceRoutes />
          </ProtectedRoute>
        }
      >
        <Route
          path=":budgetId/invoices"
          element={
            <ProtectedRoute path="/">
              <InvoiceListView />
            </ProtectedRoute>
          }
          errorElement={<ErrorPage />}
        />
      </Route>
      <Route
        path="invoices/:budgetId/create"
        errorElement={<ErrorPage />}
        element={
          <ProtectedRoute path="/">
            <InvoiceCreation />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute path="/*">
            <Dashboard />
          </ProtectedRoute>
        }
        errorElement={<ErrorPage />}
      />
      <Route
        path="accounts"
        errorElement={<ErrorPage />}
        element={
          <AccountAbstractionProvider>
            <Accounts />
          </AccountAbstractionProvider>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
