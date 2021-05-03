import {event} from '../ts/interfaces-type';
import { type } from "../types/types";


export interface initialStateCalendar{
  events: event[],
  activeEvent: event | any
}
interface Action {
  type: string,
  payload: event | any
}

const initialState: initialStateCalendar = {
  events:[],
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
    case type.eventLoaded:
      return{
        ...state,
        events: [ ...action.payload ] 
      }
    case type.eventClear:
      return{
        events:[],
        activeEvent:{}
      }

    default:
      return state;
  }
}
