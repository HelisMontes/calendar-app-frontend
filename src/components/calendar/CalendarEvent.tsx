import React from 'react';

export const CalendarEvent = ({ event }: any) => {
  const { title, user_id : user } = event
  return (
    <div>
      <strong>{title}</strong>
      <span>{`${user?.name ? ` - ${user.name}` : ''}`}</span>
    </div>
  )
}
