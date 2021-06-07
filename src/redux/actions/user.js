import { storageDeleteItem } from "../../core/storage";
import * as types from "../types/actionTypes";

export const loginUser = (data) => {
  return (dispatch) => {
    dispatch({ type: types.LOGIN, payload: { token: data.token, user: data.user } });
  };
};

export const logoutUser = () => {
  storageDeleteItem("token");
  return (dispatch) => {
    dispatch({ type: types.LOGOUT });
  };
};
