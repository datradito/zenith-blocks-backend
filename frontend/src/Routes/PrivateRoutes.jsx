import useAuthStore from "../store/modules/auth/index.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "../pages/Home/logIn.jsx";
import { WidthContainer } from "./Root.jsx";
import ResponsiveHeaderBar from "../Components/features/home/Header.jsx";

function PrivateRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
   const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/login");
    },
    [isAuthenticated, navigate]
  );

  // 3. While loading, show a spinner
  // if (isLoading)
  //   return (
  //       {loader}
  //   );
  if(!isAuthenticated) return (
    <WidthContainer>
      <ResponsiveHeaderBar />
      <Login />
    </WidthContainer>
  );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default PrivateRoute;

