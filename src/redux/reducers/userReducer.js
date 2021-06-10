import * as types from "../types/actionTypes";

const initialState = {
  token: "",
  user: null,
  loggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loggedIn: true,
      };
    case types.RESTORE_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        loggedIn: true,
      };
    case types.SET_USER_INFO:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
      };
    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
