import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { event } from '../../ts/interfaces-type';
import { useEvents } from '../../hook/useEvents';
import { CalendarModal } from './CalendarModal';
import { AddNewFab } from '../ui/AddNewFab';
import 'moment/locale/es'

import 'react-big-calendar/lib/css/react-big-calendar.css';
moment.locale('es')
const localizer = momentLocalizer(moment);  

const events:event = {
  title: 'Cumpleaños del jefe',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#fafafa',
  user:{
    uid: '111',
    name: 'Maximo'
  }
}

export const CalendarScreen = () => {
  const{
    lastView,
    eventStyleGetter,
    onDoubleClick,
    onSelectEvent,
    changeOnView, 
  } = useEvents();

  return (
    <div className="calendar-screen">
      <Navbar />
       <Calendar
        localizer={localizer}
        events={[events]}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter = {eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView = {changeOnView}
        view = { lastView }
        components={{
          event: CalendarEvent,
        }}
      />
      <AddNewFab />
     <CalendarModal />
    </div>
  )
}
