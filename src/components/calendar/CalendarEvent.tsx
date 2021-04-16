import React from 'react'
import { event } from '../../ts/interfaces-type'

export const CalendarEvent = ({ event }: {event: event}) => {
  const { title, user } = event
  return (
    <div>
      <strong>{title}</strong>
      <span>{` - ${user.name}`}</span>
    </div>
  )
}
