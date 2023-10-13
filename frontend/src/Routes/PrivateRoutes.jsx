import Login from "../Components/pages/Home/logIn";
import ResponsiveHeaderBar from "../Components/DisplayElements/Header/Header.jsx";
import { useContext, useEffect } from "react";
import { UserContext } from "../Utility/Providers/UserProvider";

const PrivateRoute = ({ children }) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
     setUser(null)
    }
  } ,[user]);

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