import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { event } from '../../ts/interfaces-type';
import { EventsCalendarScreen } from '../../events/eventsCalendarScreen';
import { CalendarModal } from './CalendarModal';
import { AddNewFab } from '../ui/AddNewFab';
import 'moment/locale/es'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { clearEventActive } from '../../actions/eventos';

moment.locale('es')
const localizer = momentLocalizer(moment);  
export const CalendarScreen = () => {
  const {events, activeEvent}:{events:event[], activeEvent:event} = useSelector((state:any) => state.calendar)
  const dispatch = useDispatch()
  const{
    lastView,
    eventStyleGetter,
    onDoubleClick,
    onSelectEvent,
    changeOnView, 
  } = EventsCalendarScreen();
  const onSelectSlot = (event: any) => {
    activeEvent.id && dispatch(clearEventActive())
  }
  return (
    <div className="calendar-screen">
      <Navbar />
       <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter = {eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView = {changeOnView}
        view = { lastView }
        onSelectSlot={onSelectSlot}
        selectable={true}
        components={{
          event: CalendarEvent,
        }}
      />
      <AddNewFab />
      {
        activeEvent.id && <DeleteEventFab id={activeEvent.id}/>
      }
     <CalendarModal />
    </div>
  )
}
