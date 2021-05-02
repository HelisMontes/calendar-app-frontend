import {stringOrDate} from 'react-big-calendar'
import { initialStateAuth } from '../reducers/authReducer';
import { initialStateCalendar } from '../reducers/calendarReducers';

type uid =  string | number;
interface user {
  uid: uid,
  name: string
}
export interface event{
  title: string,
  start:stringOrDate,
  end: stringOrDate,
  user?: user,
  note?:string,
  id?:uid,
  bgcolor?: string,
}
export interface State {
  ui : { openModal : boolean },
  calendar : initialStateCalendar,
  auth : initialStateAuth
}