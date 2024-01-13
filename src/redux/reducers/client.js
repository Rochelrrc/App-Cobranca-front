import actionTypes from "./action-types";

const initialState = {
  clientId: null,
  isOpenClientData: false,
  updateClientList: false,
  updateOneClient: false,
};

export default function clientReducer(state = initialState, action) {
  if (action.type === actionTypes.clientIdKey) {
    return { ...state, clientId: action.payload };
  }
  if (action.type === actionTypes.isOpenClientDataKey) {
    return { ...state, isOpenClientData: action.payload };
  }
  if (action.type === actionTypes.updateClientListKey) {
    return { ...state, updateClientList: action.payload };
  }
  if (action.type === actionTypes.updateOneClientKey) {
    return { ...state, updateOneClient: action.payload };
  }

  return state;
}
