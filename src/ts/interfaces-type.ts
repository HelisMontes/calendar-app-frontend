import {stringOrDate} from 'react-big-calendar'

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