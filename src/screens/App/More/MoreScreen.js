import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../../redux/types/actionTypes";
import MoreView from "./MoreView";
import { logoutUser } from "../../../redux/actions/user";
import { setLanguageAction } from "../../../redux/actions/app";

const More = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  const logout = () => {
    dispatch(logoutUser());
  };

  const setLanguage = (language) => {
    dispatch(setLanguageAction(language));
  };

  return <MoreView logout={logout} setLanguage={(lang) => setLanguage(lang)} />;
};

export default More;
