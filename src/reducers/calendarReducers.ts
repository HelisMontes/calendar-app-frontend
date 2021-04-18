import moment from 'moment';
import {event} from '../ts/interfaces-type';
import { type } from "../types/types";


interface InitialState{
  events: event[],
  activeEvent: object
}
interface Action {
  type: string,
  payload: Object
}

const initialState: InitialState = {
  events:[{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    user:{
      uid: '111',
      name: 'Maximo'
    }
  }],
  activeEvent:{}
}
export const calendarReducers = (state: InitialState = initialState, action: Action ): InitialState | object => {
  switch (action.type) {
    case type.eventAddNew:
      return {}
    case type.eventSetActive:
      return{
        ...state,
        activeEvent: action.payload, 
      }
  
    default:
      return state;
  }
}
