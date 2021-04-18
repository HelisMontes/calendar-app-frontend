import { type } from "../types/types";

interface InitialState {
  openModal : boolean,
}
const initialState: InitialState = {
  openModal : false,
}
export const uiReducers = (state: InitialState = initialState, action:any) => {
  switch (action.type) {
    case type.uiOpenModal:
      return {
        ...state,
        openModal: true
      };
    case type.uiCloseModal:
      return {
        ...state,
        openModal: false
      };
    default:
    return state;
  }
}