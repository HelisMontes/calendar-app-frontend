import { useState } from 'react'
import {stringOrDate, View} from 'react-big-calendar'
import { event } from '../ts/interfaces-type';

export const useEvents = () => {
    const view:View = 'month'
    const [lastView, setLastView] = useState((localStorage.getItem('lastView') as View) || view)
    const eventStyleGetter = (event:any, start:stringOrDate, end:stringOrDate, isSelected:boolean):any => {
      const style = {
        backgroundColor : '#367cf7',
        borderRadius: '3px',
        opacity: 0.8,
        display: 'block',
        color: 'white'
      }
      return {
        style
      }
    }
    const onDoubleClick = (event: event) => {
      console.log(event)
    }
    const onSelectEvent = (event: event) => {
      console.log(event)
    }
    const changeOnView = (view:View) => {
      setLastView(view)
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
