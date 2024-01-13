import actionTypes from "./action-types";

const initialState = {
  billId: null,
  chargeSearchValue: ""
};

export default function billReducer(state = initialState, action) {
  if (action.type === actionTypes.billIdKey) {
    return { ...state, billId: action.payload };
  }

  if (action.type === actionTypes.chargeSearchValueKey) {
    return { ...state, chargeSearchValue: action.payload };
  }

  return state;
}
