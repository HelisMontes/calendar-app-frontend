import { type } from "../types/types";

interface initialState{
  checking: boolean,
  uid: string,
  name: string
}
interface action{
  type: string,
  payload: initialState
}

const initialState: initialState = {
  checking: true,
  uid: '',
  name: ''
}

export const authReducer = (state: initialState = initialState, action: action): initialState | object => {
  switch (action.type) {
    
    default:
      return state
  }
}
