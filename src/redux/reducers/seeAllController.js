import actionTypes from "./action-types";

const initialState = {
  seeAllUpToDateIsActive: false,
  seeAllDefaultingCustomerIsActive: false,
  seeAlloverBillsIsActive: false,
  seeAllpaidBillsIsActive: false,
  seeAllpedingBillsIsActive: false,
};

export default function SeeAllReducer(state = initialState, action) {
  if (action.type === actionTypes.seeAllUpToDateIsActiveKey) {
    return { ...state, seeAllUpToDateIsActive: action.payload };
  }

  if (action.type === actionTypes.seeAllDefaultingCustomerIsActiveKey) {
    return { ...state, seeAllDefaultingCustomerIsActive: action.payload };
  }

  if (action.type === actionTypes.seeAlloverBillsIsActiveKey) {
    return { ...state, seeAlloverBillsIsActive: action.payload };
  }

  if (action.type === actionTypes.seeAllpaidBillsIsActiveKey) {
    return { ...state, seeAllpaidBillsIsActive: action.payload };
  }

  if (action.type === actionTypes.seeAllpedingBillsIsActiveKey) {
    return { ...state, seeAllpedingBillsIsActive: action.payload };
  }

  return state;
}
