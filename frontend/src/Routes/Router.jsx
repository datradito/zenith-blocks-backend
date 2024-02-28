import { lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Root from "./Root";
import ErrorPage from "./ErrorPage";
import ProposalRoute from "./ProposalDependentRoutes";
import PaymentCreation, {
  paymentLoader,
} from "../Components/pages/Payments/PaymentCreation";
import InvoiceRoutes from "./InvoiceDependentRoutes";
import NotFound from "./NotFound";
import MemoizedInvoiceProvider from "../Utility/Providers/InvoiceProvider";
import SwapProvider from "../Utility/Providers/SwapProvider";

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
        element={<ProposalDetailView />}
        errorElement={<ErrorPage />}
        loader={({ params }) => {
          return { proposalId: params.proposalId };
        }
        }
      />
      <Route path="budgets" element={<ProposalRoute />}>
        <Route
          path=":proposalId/create"
          element={<CreateBudget />}
          errorElement={<ErrorPage />}
        />
      </Route>

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
      <Route path="budgets" element={<InvoiceRoutes />}>
        <Route
          path=":budgetId/invoices"
          element={
            <MemoizedInvoiceProvider>
              <InvoiceListView />
            </MemoizedInvoiceProvider>
          }
          errorElement={<ErrorPage />}
        />
      </Route>
      <Route
        path="invoices/:budgetId/create"
        errorElement={<ErrorPage />}
        element={<InvoiceCreation />}
      />
      <Route
        path="dashboard"
        element={<Dashboard />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="swap"
        element={
          <SwapProvider>
            <Swap />
          </SwapProvider>
        }
        errorElement={<ErrorPage />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
