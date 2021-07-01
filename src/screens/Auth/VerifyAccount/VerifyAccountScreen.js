import React from "react";
import { useDispatch } from "react-redux";
import { storageSetItem } from "../../../core/storage";
import { loginUserAction } from "../../../redux/actions/user";
import VerifyAccountView from "./VerifyAccountView";

const VerifyAccount = ({ navigation, route }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    verifyAccount(route.params.hash);
  }, [route.params.hash]);

  const verifyAccount = (hash) => {
    try {
      // Send verification to backend and get token
      console.log(hash);
      setTimeout(async () => {
        await storageSetItem("token", "X");
        dispatch(loginUserAction({ data: { token: "X", user: "Y" } }));
      }, 1000);
      Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return <VerifyAccountView />;
};

export default VerifyAccount;
