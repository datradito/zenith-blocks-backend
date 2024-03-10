import Login from "../pages/Home/logIn";
import ResponsiveHeaderBar from "../Components/features/home/Header.jsx";
import { WidthContainer } from "./Root.jsx";
import useAuthStore from "../store/modules/auth/index.ts";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return isAuthenticated ? (
    children
  ) : (
    <WidthContainer>
      <ResponsiveHeaderBar />
      <Login />
    </WidthContainer>
  );
};

export default PrivateRoute;
