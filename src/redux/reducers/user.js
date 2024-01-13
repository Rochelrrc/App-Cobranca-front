import actionTypes from "./action-types";

const initialState = {
  user: null,
};

export default function userReducer(state = initialState, action) {
  if (action.type === actionTypes.userKey) {
    return { ...state, user: action.payload };
  }

  return state;
}
