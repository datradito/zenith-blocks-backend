import Login from "../Components/pages/Home/logIn";
import ResponsiveHeaderBar from "../Components/DisplayElements/Header/Header.jsx";
import { useContext } from "react";
import { UserContext } from "../Utility/Providers/UserProvider";
import { WidthContainer } from "./Root.jsx";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

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