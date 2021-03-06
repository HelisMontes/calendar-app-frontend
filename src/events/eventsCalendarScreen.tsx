import { useEffect, useState } from 'react';
import {stringOrDate, View} from 'react-big-calendar';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../actions/ui';
import { event } from '../ts/interfaces-type';
import {eventActive} from '../actions/eventos';
import {eventStartLoading} from '../actions/eventos'

export const EventsCalendarScreen = () => {
    const dispatch = useDispatch();
    const view:View = 'month';
    const [lastView, setLastView] = useState((localStorage.getItem('lastView') as View) || view);
    const eventStyleGetter = (event:any, start:stringOrDate, end:stringOrDate, isSelected:boolean):any => {
      const style = {
        backgroundColor : '#367cf7',
        borderRadius: '3px',
        opacity: 0.8,
        display: 'block',
        color: 'white'
      }
      return{
        style
      }
    }
    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);
    const onDoubleClick = (event: event) => {
      dispatch(uiOpenModal());
    }
    const onSelectEvent = (event: event) => {
      dispatch(eventActive(event));
    }
    const changeOnView = (view:View) => {
      setLastView(view);
      localStorage.setItem('lastView', view);
    }
    return{ 
      lastView,
      eventStyleGetter,
      onDoubleClick,
      onSelectEvent,
      changeOnView,   
    }
}
