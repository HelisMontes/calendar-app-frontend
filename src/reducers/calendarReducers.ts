import moment from 'moment';
import {event} from '../ts/interfaces-type';
import { type } from "../types/types";


export interface initialStateCalendar{
  events: event[],
  activeEvent: event | any
}
interface Action {
  type: string,
  payload: event
}

const initialState: initialStateCalendar = {
  events:[{
    id: Date.now(),
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
export const calendarReducers = (state: initialStateCalendar = initialState, action: Action ): initialStateCalendar | object => {
  switch (action.type) {
    case type.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    case type.eventSetActive:
      return{
        ...state,
        activeEvent: action.payload, 
      }
    case type.eventClearEventActive:
      return{
        ...state,
        activeEvent: {}
      }
    case type.eventUpdated:
      return{
        ...state,
        events: state.events.map((event: event) => 
          (event.id === action.payload.id) ? action.payload : event  
        )
      }
    case type.eventDeleted:
      return{
        ...state,
        events: state.events.filter((event: event) => event.id !== action.payload.id),
        activeEvent:{}
      }

    default:
      return state;
  }
}
