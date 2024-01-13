import actionTypes from "./action-types";

const initialState = {
  billies: [],
  updateBill: false,
  oneBill: {},
  oneBillLoading: true,
  paidBills: [],
  pedingBills: [],
  overBills: [],
  clients: [],
  oneClient: {},
  defaultingCustomers: [],
  customersUpToDate: [],
  oneClientLoading: true,
};

export default function getApiReducer(state = initialState, action) {
  if (action.type === actionTypes.billiesKey) {
    return { ...state, billies: action.payload };
  }

  if (action.type === actionTypes.updateBillKey) {
    return { ...state, updateBill: action.payload };
  }

  if (action.type === actionTypes.oneBillKey) {
    return { ...state, oneBill: action.payload };
  }

  if (action.type === actionTypes.oneBillLoadingKey) {
    return { ...state, oneBillLoading: action.payload };
  }

  if (action.type === actionTypes.paidBillKey) {
    return { ...state, paidBills: action.payload };
  }

  if (action.type === actionTypes.pedingBillKey) {
    return { ...state, pedingBills: action.payload };
  }

  if (action.type === actionTypes.overBillKey) {
    return { ...state, overBills: action.payload };
  }

  if (action.type === actionTypes.clientsKey) {
    return { ...state, clients: action.payload };
  }

  if (action.type === actionTypes.oneClientKey) {
    return { ...state, oneClient: action.payload };
  }

  if (action.type === actionTypes.defaultingCustomersKey) {
    return { ...state, defaultingCustomers: action.payload };
  }

  if (action.type === actionTypes.customersUpToDateKey) {
    return { ...state, customersUpToDate: action.payload };
  }

  if (action.type === actionTypes.oneClientLoadingKey) {
    return { ...state, oneClientLoading: action.payload };
  }

  return state;
}
