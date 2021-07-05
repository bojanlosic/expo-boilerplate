import React from "react";
import { storageDeleteItem } from "../../core/storage";
import * as types from "../types/actionTypes";
import i18n from "../../languages";
import { storageSetItem } from "../../core/storage";
import { Animated } from "react-native";

export const setLoadingAction = (action) => {
  return (dispatch) => {
    dispatch({ type: types.LOADING, payload: action });
  };
};

export const setLoadingApiAction = (action) => {
  return (dispatch) => {
    dispatch({ type: types.LOADING_API, payload: action });
  };
};

export const setLanguageAction = (language) => {
  return async (dispatch) => {
    i18n.locale = language;
    try {
      await storageSetItem("languagePicked", language);
    } catch (e) {
      alert(e);
    }
    await dispatch({ type: types.LANGUAGE, payload: language });
  };
};

export const setNotificationAction = (data) => {
  return async (dispatch) => {
    await dispatch({ type: types.NOTIFICATION, payload: data });
  };
};

export const setAppTheme = (theme) => {
  return async (dispatch) => {
    await dispatch({ type: types.CHANGE_THEME, payload: theme });
  };
};
