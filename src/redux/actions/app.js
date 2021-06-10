import { storageDeleteItem } from "../../core/storage";
import * as types from "../types/actionTypes";
import i18n from "../../languages";
import { storageSetItem } from "../../core/storage";

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
