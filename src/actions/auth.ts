import { fetchSinToken } from "../helpers/fetch";
import { type } from "../types/types";
interface Body{
  name: string,
  ok: boolean,
  token: string,
  uid: string
}
export const startLogin = (email:string, password:string):any => {
  return async(dispatch:any) => {
    console.log(email, password);
    const date = new Date().getTime()
    const response = await fetchSinToken('auth', {email, password}, 'POST');
    const body:Body = await response.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', date.toString());
      dispatch( login({
        uid: body.uid,
        name: body.name
      }))
    }  
  }
}

const login = ( user: {uid:string, name: string}) => ({
  type: type.authLogin,
  payload: user
})