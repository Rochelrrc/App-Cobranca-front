import actionTypes from "./action-types";

const initialState = {
  clientSearchValue: "",
};

export default function userReducer(state = initialState, action) {
  if (action.type === actionTypes.clientSearchValueKey) {
    return { ...state, clientSearchValue: action.payload };
  }

  return state;
}
