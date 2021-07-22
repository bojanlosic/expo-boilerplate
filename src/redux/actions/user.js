import { axiosService } from "../../core/axios";
import { loginConfig, registrationConfig } from "../../core/axios/routes";
import { storageDeleteItem, storageSetItem } from "../../core/storage";
import * as types from "../types/actionTypes";
import { setLoadingApiAction } from "./app";

export const registerUserAction = (data) => {
  return async (dispatch) => {
    dispatch(setLoadingApiAction(true));
    try {
      let response = await axiosService(registrationConfig, data);
      if (response.data.message) {
        alert(response.data.message);
        dispatch(setLoadingApiAction(false));
        return;
      }
      dispatch({ type: types.REGISTER, payload: { token: response.data.token, user: response.data.user } });
      dispatch(setLoadingApiAction(false));
      Promise.resolve();
    } catch (error) {
      dispatch(setLoadingApiAction(false));
      return Promise.reject(error);
    }
  };
};

export const loginUserAction = (data) => {
  return async (dispatch) => {
    dispatch(setLoadingApiAction(true));
    try {
      let response = await axiosService(loginConfig, data);
      if (response.data.message) {
        alert(response.data.message);
        dispatch(setLoadingApiAction(false));
        return;
      }
      dispatch({ type: types.LOGIN, payload: { token: response.data.token, user: response.data.user } });
      await storageSetItem("token", response.data.token);
      dispatch(setLoadingApiAction(false));
      Promise.resolve();
    } catch (error) {
      dispatch(setLoadingApiAction(false));
      return Promise.reject(error);
    }
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
