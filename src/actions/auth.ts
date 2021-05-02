import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { type } from "../types/types";

interface Body{
  name: string,
  ok: boolean,
  token: string,
  uid: string,
  msg:  string
}

const date = new Date().getTime();

export const startLogin = (email: string, password: string): any => {
  return async(dispatch: Function) => {
    const response = await fetchSinToken('auth', {email, password}, 'POST');
    const body: Body = await response.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', date.toString());
      dispatch( login({
        uid: body.uid,
        name: body.name
      }))
    }else{
      Swal.fire('Error', body.msg, 'error');
    } 
  }
}

export const startRegister = (name: string, email: string, password: string) => {
  return async (dispatch:Function) => {
    const response = await fetchSinToken('auth/new', {name, email, password}, 'POST');
    const body: Body = await response.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', date.toString());
      dispatch( login({
        uid: body.uid,
        name: body.name
      }))
    }else{
      Swal.fire('Error', body.msg, 'error');
    }
  }
}

const login = ( user: {uid:string, name: string}) => ({
  type: type.authLogin,
  payload: user
});