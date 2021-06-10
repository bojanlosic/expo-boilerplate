import * as types from "../types/actionTypes";

const initialState = {
  isLoading: true,
  isLoadingAPI: false,
  language: null,
  notification: null,
  camera: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.LOADING_API:
      return {
        ...state,
        isLoadingAPI: action.payload,
      };
    case types.LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case types.NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case types.SHOW_CAMERA:
      return {
        ...state,
        camera: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
