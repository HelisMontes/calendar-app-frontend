import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDeleted } from '../../actions/eventos';

export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const handleClickDelete = () => {
    dispatch(eventStartDeleted());
  }
  return (
    <button 
      className="btn btn-danger fab-danger"
      onClick={handleClickDelete}
    >
      <i className="fas fa-trash"></i>
      <span>Borrar</span>
    </button>
  )
}