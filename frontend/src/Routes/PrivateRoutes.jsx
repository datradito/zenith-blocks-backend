import Login from "../Components/pages/Home/logIn";
import ResponsiveHeaderBar from "../Components/DisplayElements/Header/Header.jsx";
import { useContext } from "react";
import { UserContext } from "../Utility/Providers/UserProvider";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  console.log(user)

  return user ? (
    children
  ) : (
    <>
      <ResponsiveHeaderBar />
      <Login />
    </>
  );
};

export default PrivateRoute;