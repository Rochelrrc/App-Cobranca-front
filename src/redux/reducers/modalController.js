import actionTypes from "./action-types";

const initialState = {
  newClientModalIsOpen: false,
  editClientModalIsOpen: false,
  addBillieModalIsOpen: false,
  deleteBillModalIsOpen: false,
  billDetailsModalIsOpen: false,
  editBillieModalIsOpen: false,
};

export default function modalReducer(state = initialState, action) {
  if (action.type === actionTypes.editClientModalIsOpenKey) {
    return { ...state, editClientModalIsOpen: action.payload };
  }

  if (action.type === actionTypes.newClientModalIsOpenKey) {
    return { ...state, newClientModalIsOpen: action.payload };
  }

  if (action.type === actionTypes.addBillieModalIsOpenKey) {
    return { ...state, addBillieModalIsOpen: action.payload };
  }

  if (action.type === actionTypes.editBillieModalIsOpenKey) {
    return { ...state, editBillieModalIsOpen: action.payload };
  }

  if (action.type === actionTypes.deleteBillModalIsOpenKey) {
    return { ...state, deleteBillModalIsOpen: action.payload };
  }

  if (action.type === actionTypes.billDetailsModalIsOpenKey) {
    return { ...state, billDetailsModalIsOpen: action.payload };
  }

  return state;
}
