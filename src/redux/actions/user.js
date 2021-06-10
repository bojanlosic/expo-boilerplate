import { storageDeleteItem } from "../../core/storage";
import * as types from "../types/actionTypes";

export const loginUserAction = (data) => {
  return (dispatch) => {
    dispatch({ type: types.LOGIN, payload: { token: data.token, user: data.user } });
  };
};

export const setUserInfoAction = (data) => {
  return (dispatch) => {
    dispatch({ type: types.SET_USER_INFO, payload: data });
  };
};

export const logoutUser = () => {
  storageDeleteItem("token");
  return (dispatch) => {
    dispatch({ type: types.LOGOUT });
  };
};
