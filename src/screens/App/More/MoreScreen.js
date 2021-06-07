import React from "react";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../../redux/types/actionTypes";
import MoreView from "./MoreView";
import { logoutUser } from "../../../redux/actions/user";

const More = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return <MoreView logout={logout} />;
};

export default More;
