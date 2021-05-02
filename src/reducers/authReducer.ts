import { type } from "../types/types";

export interface initialStateAuth{
  checking: boolean,
  uid: string,
  name: string
}
interface action{
  type: string,
  payload: initialStateAuth
}

const initialState: initialStateAuth = {
  checking: true,
  uid: '',
  name: ''
}

export const authReducer = (state: initialStateAuth = initialState, action: action): initialStateAuth | object => {
  switch (action.type) {
    case type.authLogin:
      return{
        ...state,
        ...action.payload,
        checking: false,
      }
      case type.authCheckingFinish:
        return{
          ...state,
          checking: false
        }
      case type.authLogout:
        return{
          checking: false
        }
    default:
      return state
  }
}
