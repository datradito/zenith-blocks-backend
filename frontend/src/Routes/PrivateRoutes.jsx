import Login from "../Components/pages/Home/logIn";
import ResponsiveHeaderBar from "../Components/DisplayElements/Header/Header.jsx";
import { useContext } from "react";
import { UserContext } from "../Utility/Providers/UserProvider";
import { WidthContainer } from "./Root.jsx";
import CircularIndeterminate from "../Components/atoms/Loader/loader.jsx";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    <CircularIndeterminate />;
  }

  return user ? (
    children
  ) : (
    <WidthContainer>
      <ResponsiveHeaderBar />
      <Login />
    </WidthContainer>
  );
};

export default PrivateRoute;