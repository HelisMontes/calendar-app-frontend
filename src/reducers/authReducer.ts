import { type } from "../types/types";

interface InitialState{
  checking: boolean,
  uid: string,
  name: string
}
interface action{
  type: string,
  payload: InitialState
}

const initialState: InitialState = {
  checking: true,
  uid: '',
  name: ''
}

export const authReducer = (state: InitialState = initialState, action: action): InitialState | object => {
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
    default:
      return state
  }
}
