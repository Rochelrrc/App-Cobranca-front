import actionTypes from "./action-types";

const initialState = {
  iconsStyleState: { home: true, user: false, file: false },
};

export default function reducer(state = initialState, action) {
  if (action.type === actionTypes.iconsStyleStateKey) {
    return { ...state, iconsStyleState: action.payload };
  }

  return state;
}
